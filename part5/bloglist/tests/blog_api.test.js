const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'A blog 1',
        author: 'author 1',
        url: 'url',
        likes: 0
      },
      {
        title: 'A blog 2',
        author: 'author 2',
        url: 'urli',
        likes: 2
      },
      {
        title: 'A blog 3',
        author: 'author 3',
        url: 'urli',
        likes: 22
      }
]

let token 
let invalidToken 

describe('when there is initially blogs saved', () => { 

    beforeEach(async () => {
        await Blog.deleteMany({})
        let blogObject = new Blog(initialBlogs[0])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[1])
        await blogObject.save()
        blogObject = new Blog(initialBlogs[2])
        await blogObject.save()
    })

    test(`app should return correct amount of ${initialBlogs.length} blogs in json format`, async () => { 
        const response = await api 
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
        assert.strictEqual(response.body.length, initialBlogs.length)
     })
    
    test('identifying field of returned blogs should be "id"', async () => {
        const response = await api
            .get('/api/blogs')
        const checkForId = response.body.every(item => item.hasOwnProperty('id'))
        assert.strictEqual(checkForId, true)
    })

    describe('blogs are added correctly', () => {

        beforeEach( async () => {
            const user = {
                username: 'root',
                password: 'sekret'
            }
    
            const user2 = {
                username: 'root2',
                password: "sekret"
            }

            const response = await api
                .post('/api/login')
                .send(user)
                .expect(200)
            token = `Bearer ${response.body.token}`

            const wrongResponse = await api
                .post('/api/login')
                .send(user2)
                .expect(200)
            invalidToken = `Bearer ${wrongResponse.body.token}`
        })

        test('POST request works', async () => {
            const response = await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send({
                    title: 'A blog 4',
                    author: 'author 4',
                    url: 'urli',
                    likes: 222
                })
                .expect(201)
        
            const updatedResponse = await api
                .get('/api/blogs')
        
            assert.strictEqual(updatedResponse.body.length, initialBlogs.length + 1)
        })

        test('if "likes" is not given a value, set it to 0', async () => { 
            const response = await api
                .post('/api/blogs')
                .set('Authorization', token)
                .send({
                    title: 'A blog 5',
                    author: 'author 5',
                    url: 'urli'
                })
            assert.strictEqual(response.body.likes, 0)
        })
        describe('if new blog is missing details, respond with 400 Bad Request', () => {
            test('if title is missing, respond with 400 Bad Request', async () => {
                const response = await api
                    .post('/api/blogs')
                    .set('Authorization', token)
                    .send({
                        author: "author 6",
                        url: "url",
                        likes: 0
                    })
                assert.strictEqual(response.error.status, 400)
            })
            test('if url is missing, respond with 400 Bad Request', async () => {
                const response = await api
                    .post('/api/blogs')
                    .set('Authorization', token)
                    .send({
                        title: "title",
                        author: "author 6",
                        likes: 0
                    })
                assert.strictEqual(response.error.status, 400)
            })
            test('if both title and url are missing, respond with 400 Bad Request', async () => {
                const response = await api
                    .post('/api/blogs')
                    .set('Authorization', token)
                    .send({
                        author: "author 6",
                        likes: 0
                    })
                assert.strictEqual(response.error.status, 400)
            })
        })
        describe('testing if blogs can be deleted and/or edited', () => {
            let dummyBlog
            beforeEach(async () => {
                const response = await api
                    .post('/api/blogs')
                    .set('Authorization', token)
                    .send({
                        title: "title",
                        author: "author 6",
                        url: "url",
                        likes: 0
                    })
                    .expect(201)
                dummyBlog = response.body
            })
            test('dummy blog is deleted', async () => {

                const response1 = await api
                .get('/api/blogs')

                const newBlogId = dummyBlog.id

                const deleteOne = await api
                    .delete(`/api/blogs/${newBlogId}`)
                    .set('Authorization', token)
                    .expect(204)
                const response2 = await api
                .get('/api/blogs')

                assert.strictEqual(response2.body.length, response1.body.length - 1)
                })
            
            test('unauthorized user cannot delete blog', async () => {
                const response1 = await api
                .get('/api/blogs')
                
                const newBlogId = dummyBlog.id
                const response = await api
                .delete(`/api/blogs/${newBlogId}`)
                .set('Authorization', invalidToken)
                .expect(401)

                const response2 = await api
                .get('/api/blogs')

                assert.strictEqual(response2.body.length, response1.body.length)
                assert.strictEqual(response.error.status, 401)
            })

            test('a like is correctly added (incremented by 1)', async () => { 
                const blogId = dummyBlog.id

                const response = await api
                    .put(`/api/blogs/${blogId}`)
                    .set('Authorization', token)
                    .send(dummyBlog)
                const updatedBlog = response.body

                assert.strictEqual(updatedBlog.likes, dummyBlog.likes + 1);
            })
        })
    })
 })

after(async () => {
    await mongoose.connection.close()
})
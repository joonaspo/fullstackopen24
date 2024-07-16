const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const {describe, beforeEach, test} = require('node:test')
const assert = require('node:assert')
const testHelper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('When there is initially one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcryptjs.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        
        await user.save()
    })
    describe('User signup tests', () => {
        test('user creation successful with a fresh username', async () => {
            const usersAtStart = await testHelper.usersInDb()
    
            const newUser = {
                username: 'testi',
                name: 'testi käyttäjä',
                password: 'salainen'
            }
    
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const usersAtEnd = await testHelper.usersInDb()
            assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
            const usernames = usersAtEnd.map(u => u.username)
            assert(usernames.includes(newUser.username))
        })
    
        test('user cannot be created with invalid username', async () => {
            const newUser = {
                username: "te",
                password: "te"
            }
    
            await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        }) 
    
        test('user cannot be created with invalid password', async () => {
            const newUser = {
                username: "testikayttaja",
                password: "te"
            }
    
            await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        }) 
    
        test('user cannot be created with missing information', async () => {
            const newUser = {
                username: "",
                password: ""
            }
    
            await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        }) 
    
        test('user cannot be created with already-in-use username', async () => {
            
            const newUser = {
                username: 'root',
                name: 'testi käyttäjä',
                password: 'salainen'
            }
    
            await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        }) 
    })

    describe('User login tests', () => {
        test('Login attempt with invalid credentials fails', async () => { 

            const user = {
                username: 'root',
                password: 'secret'
            }

            await api
            .post('/api/login')
            .send(user)
            .expect(401)
        })
        test('Login attempt with valid credentials is successful', async () => {
            const user = {
                username: 'root',
                password: 'sekret'
            }

            await api
            .post('/api/login')
            .send(user)
            .expect(200)
        })
    })
})
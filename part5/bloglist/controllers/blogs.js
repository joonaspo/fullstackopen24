const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/ping', (req,res) => {
    res.send("Pong")
})

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.status(200).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "invalid token" })
  }
  const body = request.body
  const user = request.user

  const blogObject = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }

  const blog = new Blog(blogObject)

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "title and url are missing" })
  } else {
    try {
      const newBlog = await blog.save() 
      user.blogs = user.blogs.concat(newBlog._id)
      await user.save()
      return response.status(201).json(newBlog)
    } catch (error) {
      return response.status(500).json({ error: "failed to add blog", details: error.message})
    }
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  try {
    if (!blog) {
      return response.status(404).json({ error: "Blog not found!"})
    } else if ( blog.user.toString() === user.id.toString()) {
      await Blog.deleteOne({ _id: blog._id })
      user.blogs.filter(blogId => blogId.toString() !== blog._id.toString())
      await user.save()
      return response.status(204).end()
    } else if ( blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: "Unauthorized request!"})
    } else {
      return response.status(500).json({ error: "Unknown error occured!"})
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "Invalid token"})
  }
}})

blogsRouter.put('/:id', async (request,response) => {
  try {
    const body = request.body

    await Blog.findByIdAndUpdate(request.params.id, {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes + 1,
    })

    const updatedPost = await Blog.findById(request.params.id)
    console.log(updatedPost)
    response.status(200).json(updatedPost)
  } catch (error) {
    logger.error(error)
  }
})

module.exports = blogsRouter
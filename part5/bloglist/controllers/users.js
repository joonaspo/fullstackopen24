const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    
    if ( !username || !password ) {
        return response.status(400).json({ error: 'missing information'})
    }   else if (username.length < 3) {
        return response.status(400).json({ error: 'username too short'})
    }   else if (password.length < 3) {
        return response.status(400).json({ error: 'password too short'})
    }   else if (existingUser) {
        return response.status(400).json({ error: 'user already exists'})
    }  

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        response.status(500).json({ error: 'Failed to save user to database' })
    }
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(201).json(users)
})

module.exports = usersRouter
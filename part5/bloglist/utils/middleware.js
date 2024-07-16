const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.headers.authorization

    if (authorization && authorization.startsWith('Bearer ', '')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }
    next();
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken) {
        request.user = null
        return response.status(401).json({ error: "Invalid token!"})
    } else {
        request.user = await User.findById(decodedToken.id)
    }
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
const _ = require('lodash')
const User = require('../models/user')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfBlogs) => {
    const count = listOfBlogs.reduce((total, {likes}) => total + likes, 0)
    return count
}

const favoriteBlog = (listOfBlogs) => {
    const favorite = listOfBlogs.reduce((prev, current) => prev.likes > current.likes ? prev : current )
    return favorite
}

const mostBlogs = (listOfBlogs) => {
    const blogsByAuthor = _.countBy(listOfBlogs, 'author')
    const mostBlogsByAuthor = _.maxBy(_.keys(blogsByAuthor), author => blogsByAuthor[author])
    return {
        author: mostBlogsByAuthor,
        blogs: blogsByAuthor[mostBlogsByAuthor]
    }
}

const mostLikes = (listOfBlogs) => {
    const likesByAuthor = _.groupBy(listOfBlogs, 'author')
    const likesSumByAuthor = _.mapValues(likesByAuthor, blogs => _.sumBy(blogs, 'likes'))
    const mostLikesByAuthor = _.maxBy(_.keys(likesSumByAuthor), author => likesSumByAuthor[author])
    
    return {
        author: mostLikesByAuthor,
        likes: likesSumByAuthor[mostLikesByAuthor]
    }
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, usersInDb }
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

const user = { username: 'root', name: 'root-user' }

const blog = {
  _id:'5a422b3a1b54a676234d17f9',
  title:'Canonical string reduction',
  author:'Edsger W. Dijkstra',
  url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes:12,
  user: user,
  __v:0
}

test('renders title', () => {

  render(<Blog blog={blog}></Blog>)

  screen.getByText('Canonical string reduction by Edsger W. Dijkstra')
})

test('clicking the view button shows url, likes and user', async () => {
  render(<Blog blog={blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText('View more')

  await user.click(button)
  screen.getByText(blog.url)
  screen.getByText(`${blog.likes} Like(s)`)
  screen.getByText(`Added by: ${blog.user.name}`)
})

test('if like button is clicked twice, event handler is also called twice', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} likedBlog={mockHandler} />)

  const userEventSetup = userEvent.setup()

  const viewButton = screen.getByText('View more')
  await userEventSetup.click(viewButton)

  const likeButton = screen.getByText('Like')
  await userEventSetup.click(likeButton)
  await userEventSetup.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})
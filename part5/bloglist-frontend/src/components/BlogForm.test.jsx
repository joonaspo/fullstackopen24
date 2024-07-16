import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BlogForm } from './BlogForm'

test('form calls callback function with correct data when creating blog', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog}></BlogForm>)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('URL')

  const sendButton = screen.getByText('Create')

  await user.type(title, 'Mock title')
  await user.type(author, 'Mock author')
  await user.type(url, 'Mock URL')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Mock title')
  expect(createBlog.mock.calls[0][0].author).toBe('Mock author')
  expect(createBlog.mock.calls[0][0].url).toBe('Mock URL')
})
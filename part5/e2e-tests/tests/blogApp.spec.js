const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app tests', () => {
  beforeEach(async ({ page, request }) => {
    const resetResponse = await request.post('/api/testing/reset')
    expect(resetResponse.status()).toBe(204)
    await request.post('/api/users', {
      data: {
        name: 'root User',
        username: 'root',
        password: 'salainen'
      }
    });
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'test',
        password: 'salainen'
      }
    });
    await page.goto('/')

  })
  
  test('Front page can be opened', async ({ page }) => {
    await expect(page.getByText('blogs')).toBeVisible()
  })
  
  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login'}).click()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })
  
  describe('Login...', () => {
    test('...succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      await expect(page.getByText('Logged in as: root User')).toBeVisible()
    })
    test('...fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'secret')
      await expect(page.getByText('Incorrect username or password')).toBeVisible()
    })
  })

  describe('When logged in...', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'salainen')
    })

    test('...a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog 1', 'root', 'mock url')
      await expect(page.getByText('blog 1 by root')).toBeVisible()
    })

    test('...a blog can be liked', async ({ page }) => {
      await createBlog(page, 'test blog', 'test', 'mock url')
      const blog = page.locator('text="test blog by test"').first()
      await expect(blog).toBeVisible()
      await blog.locator('button:has-text("View more")').click()
      await expect(blog.locator('text="0 Like(s)"')).toBeVisible()
      await blog.locator('button:has-text("Like")').click()
      await expect(blog.locator('text="1 Like(s)"')).toBeVisible()
    })

    test('...a blog can be deleted', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await createBlog(page, 'delete this', 'test', 'mock url')
      const blog = page.locator('text="delete this by test"').first()
      await blog.getByRole('button', { name: "View more" }).click()
      await blog.getByRole('button', { name: "Delete" }).click() 
      await page.evaluate(() => {
        window.confirm('Delete delete this?')
      })
      await expect(blog).not.toBeVisible()
    })

    test('...only the user who added the blog can delete it', async ({ page }) => {
      await createBlog(page, 'delete this', 'test', 'mock url')
      const blog = page.locator('text="delete this by test"').first()
      await blog.getByRole('button', { name: "View more" }).click()
      await expect(blog.getByRole('button', { name: "Delete" })).toBeVisible() 
      await page.getByRole('button', { name: "Log out"}).click()
      await loginWith(page, 'root','salainen')
      await expect(blog.getByRole('button', { name: "Delete" })).not.toBeVisible() 
    })

    test('...blogs are filtered by likes in descending order', async ({ page }) => {
      await createBlog(page, 'blog 1', 'test', 'mock url')
      await createBlog(page, 'blog 2', 'test', 'mock url')
      await createBlog(page, 'blog 3', 'test', 'mock url')

      const blog1 = page.locator('text="blog 1 by test"')
      const blog2 = page.locator('text="blog 2 by test"')
      const blog3 = page.locator('text="blog 3 by test"')

      await blog1.getByRole('button', { name: "View more" }).click()
      await blog1.getByRole('button', { name: "Like"}).click()
      await blog1.getByRole('button', { name: "Like"}).click()

      await blog3.getByRole('button', { name: "View more" }).click()
      await blog3.getByRole('button', { name: "Like"}).click()

      await blog2.getByRole('button', { name: "View more" }).click()

      expect(blog1).toContainText('2 Like(s)')
      expect(blog3).toContainText('1 Like(s)')
      expect(blog2).toContainText('0 Like(s)')

      expect(page.locator('.blog').first()).toContainText('blog 1 by test')
      expect(page.locator('.blog').nth(1)).toContainText('blog 3 by test')
      expect(page.locator('.blog').last()).toContainText('blog 2 by test')
    })
  })
})
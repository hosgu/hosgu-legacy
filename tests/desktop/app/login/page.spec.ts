import { test, expect } from '@playwright/test'

import { navbarTests } from '../../../common/navbar'

const { BASE_URL = 'https://hosgu.dev' } = process.env

const url = `${BASE_URL}/login`

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })

  test('it should pass all navbar tests', async ({ page }) => {
    await navbarTests(page)
  })
})

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })

  test('it should have a title', async ({ page }) => {
    const title = await page.title()
    await expect(title).toBe('Hosgu | Booking Control - Login')
  })

  test('it should have a form', async ({ page }) => {
    const form = await page.waitForSelector('form')
    await expect(form).not.toBeNull()
  })

  test('it should have an isotype logo', async ({ page }) => {
    const element = await page.getByTestId('isotype')

    const src = await element.getAttribute('src')

    await expect(src).toBe('/images/isotype.svg')
  })

  test('it should have a headline', async ({ page }) => {
    const element = await page.locator('h2')

    await expect(element).toContainText('Login to your account')
  })

  test('it should have email and password labels', async ({ page }) => {
    const emailLabel = await page.locator('label[for="email"]')
    const passwordLabel = await page.locator('label[for="password"]')

    await expect(emailLabel).toContainText('Email')
    await expect(passwordLabel).toContainText('Password')
  })

  test('it should have email and password inputs', async ({ page }) => {
    const emailInput = await page.locator('input[name="email"]')
    const passwordInput = await page.locator('input[name="password"]')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('it should find the "Forgot your password?" link by text', async ({ page }) => {
    // Locate the link by its visible text
    const forgotPasswordLink = await page.locator('a', { hasText: 'Forgot your password?' })

    // Ensure the link is visible
    await expect(forgotPasswordLink).toBeVisible()
  })

  test('it should have a submit button', async ({ page }) => {
    const submitButton = await page.locator('button[type="submit"]')

    await expect(submitButton).toBeVisible()
  })

  test('it should have a Or text', async ({ page }) => {
    const element = await page.locator('span', { hasText: 'Or' })

    await expect(element).toBeVisible()
  })

  test('it should have a You’re new here? Create Account link', async ({ page }) => {
    const element = await page.getByTestId('create-account')

    await expect(element).toHaveText('You’re new here? Create Account')
  })

  test('it should have create account link', async ({ page }) => {
    const element = await page.locator('a', { hasText: 'Create Account' })

    const href = await element.getAttribute('href')

    await expect(href).toBe('/register')
  })

  test('it should simulate a login attempt', async ({ page }) => {
    const email = 'test@example.com'
    const password = 'test'

    const emailInput = await page.locator('input[name="email"]')
    const passwordInput = await page.locator('input[name="password"]')
    const submitButton = await page.locator('button[type="submit"]')

    await emailInput.fill(email)
    await passwordInput.fill(password)
    await submitButton.click()

    const element = await page.locator('p', { hasText: 'Invalid login' })

    await expect(element).toBeVisible
  })

  test('it should login successfully without redirectTo query', async ({ page }) => {
    const email = 'test2@gmail.com'
    const password = 'Abc123456$'

    const emailInput = await page.locator('input[name="email"]')
    const passwordInput = await page.locator('input[name="password"]')
    const submitButton = await page.locator('button[type="submit"]')

    await emailInput.fill(email)
    await passwordInput.fill(password)
    await submitButton.click()

    await page.waitForURL(BASE_URL)
  })

  test('it should login successfully with redirectTo query', async ({ page }) => {
    await page.goto(`${url}?redirectTo=/dashboard`)

    const email = 'test2@gmail.com'
    const password = 'Abc123456$'

    const emailInput = await page.locator('input[name="email"]')
    const passwordInput = await page.locator('input[name="password"]')
    const submitButton = await page.locator('button[type="submit"]')

    await emailInput.fill(email)
    await passwordInput.fill(password)
    await submitButton.click()

    await page.waitForURL(`${BASE_URL}/dashboard`)
  })
})

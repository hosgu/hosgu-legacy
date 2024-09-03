import { test, expect } from '@playwright/test'

const { BASE_URL = 'https://hosgu.dev' } = process.env

test.describe('Navbar', () => {
  test('it should have a logo', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('logo')

    await expect(element).toBeVisible()
  })

  test('it should have a Login link', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('login-link')

    await expect(element).toContainText('Login')
  })

  test('it should have a Try it Now button', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('try-now-btn')

    await expect(element).toHaveText('Try it Now')
  })

  test('it should have a Theme Switcher', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('theme-switcher')

    await expect(element).toBeVisible()
  })

  test('it should toggle the dark mode', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('svg-sun')

    // Simulate a click on the theme switcher
    await element.click()

    // Verify that the html tag has the 'dark' class after the click
    const htmlClassList = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    await expect(htmlClassList).toBe(true)
  })
})

test.describe('Login Page', () => {})

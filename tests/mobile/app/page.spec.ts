import { test, expect, devices } from '@playwright/test'

import { navbarTests } from '../../common/navbar'

const { BASE_URL = 'https://hosgu.dev' } = process.env

// Use the iPhone 15 device
test.use({
  ...devices['iPhone 15']
})

test.describe('Metadata', () => {
  test('it should have correct metadata and elements', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle('Hosgu | Booking Control')
  })
})

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
  })

  test('it should pass all navbar tests', async ({ page }) => {
    await navbarTests(page)
  })
})

test.describe('Hamburger Menu', () => {
  test('it should open the hamburger menu', async ({ page }) => {
    await page.goto(BASE_URL)
    const element = await page.getByTestId('svg-hamburger')
    await element.click()

    const closeElement = await page.getByTestId('svg-x')
    await expect(closeElement).toBeVisible()
  })
})

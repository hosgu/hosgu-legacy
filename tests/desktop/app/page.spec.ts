import { test, expect } from '@playwright/test'

import { navbarTests } from '../../common/navbar'

const { BASE_URL = 'https://hosgu.dev' } = process.env

test.describe('Metadata', () => {
  test('it should have correct metadata and elements', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page).toHaveTitle('Hosgu | Booking Control')
  })
})

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)

    await page.getByRole('button', { name: 'Accept All' }).click()
  })

  test('it should pass all navbar tests', async ({ page }) => {
    await navbarTests(page)
  })
})

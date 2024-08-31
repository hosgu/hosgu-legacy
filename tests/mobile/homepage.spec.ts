import { test, expect, devices } from '@playwright/test'

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
  test('it should have a logo', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('logo')

    await expect(element).toBeVisible()
  })

  test('it should have a Hamburger menu', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('hamburger-menu')

    await expect(element).toBeVisible()
  })

  test('it should open the Hamburger menu', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('svg-hamburger')

    // Simulate a click on the Hamburger menu
    await element.click()

    // Verify that the Hamburger menu is open
    const hamburgerMenu = await page.getByTestId('hamburger-menu')

    await expect(hamburgerMenu).toBeVisible()
  })

  test('it should close the Hamburger menu', async ({ page }) => {
    await page.goto(BASE_URL)

    const element = await page.getByTestId('svg-hamburger')

    // Simulate a click on the Hamburger menu
    await element.click()

    // Verify that the Hamburger menu is open
    const hamburgerMenu = await page.getByTestId('hamburger-menu')

    await expect(hamburgerMenu).toBeVisible()

    // Simulate a click on the close button
    const closeButton = await page.getByTestId('svg-x')

    await closeButton.click()

    // Verify that the Hamburger menu is closed
    await expect(closeButton).not.toBeVisible()
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

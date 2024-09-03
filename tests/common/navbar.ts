import { expect } from '@playwright/test'

export const navbarTests = async (page: any) => {
  let element: any = null

  // it should have a logo
  element = await page.getByTestId('logo')
  await expect(element).toBeVisible()

  // it should have a Login link
  element = await page.getByTestId('login-link')
  await expect(element).toContainText('Login')

  // it should have a Try it Now button
  element = await page.getByTestId('try-now-btn')
  await expect(element).toHaveText('Try it Now')

  // it should have a Theme Switcher
  element = await page.getByTestId('theme-switcher')
  await expect(element).toBeVisible()

  // it should toggle the dark mode
  element = await page.getByTestId('svg-sun')
  await element.click()

  const htmlClassList = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
  )

  await expect(htmlClassList).toBe(true)
}

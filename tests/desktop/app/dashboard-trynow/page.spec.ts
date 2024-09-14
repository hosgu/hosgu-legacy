import { test, expect } from '@playwright/test'

const { BASE_URL = 'https://hosgu.dev' } = process.env

const url = `${BASE_URL}/`

test.describe('Try Now Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })
  //checks if the manage your bookings header is there
  test('it should have a headline', async ({ page }) => {
    await page.locator('section')
    const element = page.locator('h1', { hasText: 'Manage your bookings from start to end' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for booking div
  test('it should have a booking container', async ({ page }) => {
    const element = page.getByTestId('bookingdiv')

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for booking icon
  test('it should have a Booking Icon', async ({ page }) => {
    const element = page.getByTestId('booking')
    await element.scrollIntoViewIfNeeded()

    const src = await element.getAttribute('src')

    expect(src).toBe('/images/icon_booking.svg')
  })

  //checks for booking headline
  test('it should have a booking headline', async ({ page }) => {
    const element = page.locator('h2', { hasText: 'Manage your bookings' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for booking subheadline
  test('it should have a booking subheadline', async ({ page }) => {
    const element = page.locator('p', { hasText: 'Simplify Booking for Everyone' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //should have a pricing container(div)
  test('it should have a pricing container', async ({ page }) => {
    const element = page.getByTestId('pricingdiv')

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for price icon
  test('it should have a Price Icon', async ({ page }) => {
    const element = page.getByTestId('price-icon')
    await element.scrollIntoViewIfNeeded()

    const src = await element.getAttribute('src')

    expect(src).toBe('/images/icon_price.svg')
  })

  //checks for pricing headline
  test('it should have a pricing headline', async ({ page }) => {
    const element = page.locator('h2', { hasText: 'Flexible Pricing' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for pricing subheadline
  test('it should have a pricing subheadline', async ({ page }) => {
    const element = page.locator('p', {
      hasText: 'Choose from our free tier or enhanced features to fit your business needs.'
    })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //should have a business container(div)
  test('it should have a business container', async ({ page }) => {
    const element = page.getByTestId('businessdiv')

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for business icon
  test('it should have a Business Icon', async ({ page }) => {
    const element = page.getByTestId('business-icon')
    await element.scrollIntoViewIfNeeded()

    const src = await element.getAttribute('src')

    expect(src).toBe('/images/icon_business.svg')
  })

  //checks for business headline
  test('it should have a business headline', async ({ page }) => {
    const element = page.locator('h2', { hasText: 'Measure your business' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for business subheadline
  test('it should have a business subheadline', async ({ page }) => {
    const element = page.locator('p', {
      hasText: 'Easily Measure Your Success'
    })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //should have a business phone container(div)
  test('it should have a business phone container', async ({ page }) => {
    const element = page.getByTestId('phonediv')

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for business phone icon
  test('it should have a Phone Icon', async ({ page }) => {
    const element = page.getByTestId('phone-icon')
    await element.scrollIntoViewIfNeeded()

    const src = await element.getAttribute('src')

    expect(src).toBe('/images/icon_phone.svg')
  })

  //checks for business phone headline
  test('it should have a business from phone headline', async ({ page }) => {
    const element = page.locator('h2', { hasText: 'Run your business from your phone' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for business phone subheadline
  test('it should have a business phone subheadline', async ({ page }) => {
    const element = page.locator('p', {
      hasText: 'Stay Connected and Process Sales'
    })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for trynow container
  test('trynow section should have a containing div', async ({ page }) => {
    const element = page.getByTestId('trynow-container')

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for trynow headline
  test('trynow section should have required text', async ({ page }) => {
    const element = page
      .getByTestId('trynow-headline')
      .filter({ hasText: 'Ready to transform your property management experience?' })

    await element.scrollIntoViewIfNeeded()
    await expect(element).toBeVisible()
  })

  //checks for button visibility
  test('second try it now button should be visible', async ({ page }) => {
    const button = page
      .locator('section')
      .filter({ hasText: 'Ready to transform your' })
      .getByRole('button')

    await button.scrollIntoViewIfNeeded()
    await expect(button).toBeVisible()
  })

  //checks for button action
  test('second button should have click', async ({ page }) => {
    const button = page
      .locator('section')
      .filter({ hasText: 'Ready to transform your' })
      .getByRole('button')

    const input = page.getByTestId('tryinput')

    await button.click()
    await expect(input).toBeFocused()
  })
})

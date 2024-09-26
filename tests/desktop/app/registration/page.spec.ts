import { test, expect } from '@playwright/test'

const { BASE_URL = 'https://hosgu.dev' } = process.env

const url = `${BASE_URL}/`

test.describe('Registration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url)
  })

  //checks for full name input
  test('Full Name input check', async ({ page }) => {
    const fullname = await page.locator('label[for="fullName"]')
    const nameInput = await page.locator('input[id="fullName"]')

    await expect(fullname).toContainText('Full Name')
    await expect(nameInput).toBeVisible()
    await expect(nameInput).toHaveAttribute('placeholder', 'e.g. John Smith')
    await nameInput.click()
  })

  //checks for email input
  test('Email input check', async ({ page }) => {
    const email = await page.locator('label[for="businessEmail"]')
    const emailInput = await page.locator('input[name="businessEmail"]')

    await expect(email).toContainText('Business Email')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveAttribute('placeholder', 'e.g. mail@example.com')
    await emailInput.click()
  })

  //checks for business website input
  test('Business Website input check', async ({ page }) => {
    const website = await page.locator('label[for="businessWebsite"]')
    const websiteInput = await page.locator('input[name="businessWebsite"]')

    await expect(website).toContainText('Business Website')
    await expect(websiteInput).toBeVisible()
    await expect(websiteInput).toHaveAttribute('placeholder', 'e.g. yourdomain.com')
    await websiteInput.click()
  })

  //checks for business name input
  test('Business Name input check', async ({ page }) => {
    const name = await page.locator('label[for="businessName"]')
    const nameInput = await page.locator('input[name="businessName"]')

    await expect(name).toContainText('Business Name')
    await expect(nameInput).toBeVisible()
    await expect(nameInput).toHaveAttribute('placeholder', 'e.g. Cabañas San Pancho')
    await nameInput.click()
  })

  //checks for business phone input
  test('Business Phone input check', async ({ page }) => {
    const phone = await page.locator('label[for="businessPhone"]')
    const phoneInput = await page.locator('input[name="businessPhone"]')

    await expect(phone).toContainText('Business Phone')
    await expect(phoneInput).toBeVisible()
    await expect(phoneInput).toHaveAttribute('placeholder', 'e.g. +1 234 5677')
    await phoneInput.click()
  })

  //checks for Country website input
  test('Country input check', async ({ page }) => {
    const country = await page.locator('label[for="country"]')
    const countryInput = await page.locator('input[name="country"]')

    await expect(country).toContainText('Country')
    await expect(countryInput).toBeVisible()
    await expect(countryInput).toHaveAttribute('placeholder', 'e.g. Mexico')
    await countryInput.click()
  })

  //checks Get Started Button
  test('Get Started Button Check', async ({ page }) => {
    const button = await page.locator('button[type="submit"]')
    await button.click()
  })

  //simulate a successful sign up
  test('sign up successful', async ({ page }) => {
    const name = 'Test Name'
    const email = 'test@example.com'
    const website = 'testwebsite.com'
    const businessName = 'test business'
    const number = '+1 909 223 1112'
    const country = 'USA'

    const nameInput = await page.locator('input[id="fullName"]')
    const emailInput = await page.locator('input[name="businessEmail"]')
    const websiteInput = await page.locator('input[name="businessWebsite"]')
    const businessNameInput = await page.locator('input[name="businessName"]')
    const phoneInput = await page.locator('input[name="businessPhone"]')
    const countryInput = await page.locator('input[name="country"]')
    const button = await page.locator('button[type="submit"]')
    const successHeader = await page.locator('h2:has-text("Just One More Step to Get Started!")')
    const success = await page.locator(
      'p:has-text("Thank you for registering! Please check your email to complete your profile setup and activate your account.")'
    )

    await nameInput.fill(name)
    await emailInput.fill(email)
    await websiteInput.fill(website)
    await businessNameInput.fill(businessName)
    await phoneInput.fill(number)
    await countryInput.fill(country)
    await button.click()
    await expect(successHeader).toBeVisible()
    await expect(success).toBeVisible()
  })

  //simulate failed sign up
  test('sign up failed', async ({ page }) => {
    const name = 'Test Name'
    const email = 'tested@example.com'
    const website = 'testwebsite.com'
    const businessName = 'test business'
    const number = '909 223 1112' //bad phone number
    const country = 'USA'

    const nameInput = await page.locator('input[id="fullName"]')
    const emailInput = await page.locator('input[name="businessEmail"]')
    const websiteInput = await page.locator('input[name="businessWebsite"]')
    const businessNameInput = await page.locator('input[name="businessName"]')
    const phoneInput = await page.locator('input[name="businessPhone"]')
    const countryInput = await page.locator('input[name="country"]')
    const button = await page.locator('button[type="submit"]')

    await nameInput.fill(name)
    await emailInput.fill(email)
    await websiteInput.fill(website)
    await businessNameInput.fill(businessName)
    await phoneInput.fill(number)
    await countryInput.fill(country)
    await button.click()

    await expect(nameInput).toHaveValue(name)
    await expect(emailInput).toHaveValue(email)
    await expect(websiteInput).toHaveValue(website)
    await expect(businessNameInput).toHaveValue(businessName)
    await expect(phoneInput).toHaveValue(number)
    await expect(countryInput).toHaveValue(country)
  })
})

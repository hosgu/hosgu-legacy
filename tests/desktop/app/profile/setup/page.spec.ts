import { test, expect } from './fixtures/profile-setup-test'
import { navbarTests } from '../../../../common/navbar'

const url = '/profile/setup?code=1234567890'

test.describe('Navbar', () => {
  test('it should pass all navbar test', async ({ stepOnePage, page }) => {
    await navbarTests(page)
  })
})

test.describe('Profile Setup ', () => {
  test('it should show first page UI elements', async ({ stepOnePage, page }) => {
    await expect(await page.getByRole('heading', { name: "Let's start!" })).toBeVisible()
    await expect(await page.locator('#step-text')).toContainText('Step 1 of 8')
    await expect(await page.locator('div > .bg-gradient-to-r').first()).toBeVisible()
    await expect(await page.locator('.bg-gray-500').first()).toBeVisible()
    await expect(await page.locator('div > .flex > div:nth-child(3)')).toBeVisible()
    await expect(await page.locator('.flex > div:nth-child(4)')).toBeVisible()
    await expect(await page.locator('div:nth-child(5)')).toBeVisible()
    await expect(await page.locator('.flex > div:nth-child(6)')).toBeVisible()
    await expect(await page.locator('.flex > div:nth-child(7)')).toBeVisible()
    await expect(await page.locator('div:nth-child(8)')).toBeVisible()
    await expect(await page.getByRole('button', { name: 'Next' })).toBeVisible()
  })

  test('it should validate password is at least 8 characters length', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.clickNext()
    await expect(
      await page.locator('.text-red-500 :text-is("Password must be at least 8 characters long.")')
    ).toBeTruthy()
  })

  test('it should validate password is at least one upper case character', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setLCPassword()
    await stepOnePage.clickNext()
    await expect(
      page.getByText('Password must contain at least one uppercase letter.')
    ).toBeVisible({
      timeout: 10000
    })
  })

  test('it should validate password is at least one special character', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setSCPassword()
    await stepOnePage.clickNext()
    await expect(
      await page.getByText('Password must contain at least one special character.')
    ).toBeVisible({
      timeout: 10000
    })
  })

  test('after a valid password it should validate propery name is not empty', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(await page.getByText('Please enter your property name')).toBeVisible({
      timeout: 10000
    })
  })

  test('after a valid property name it should validate Google Maps link is not empty', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.clickNext()
    await expect(await page.getByText('Please enter your Google Maps')).toBeVisible({
      timeout: 10000
    })
  })

  test('after a valid property google maps URL it should validate property state blank', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.clickNext()
    await expect(await page.getByText('Please enter your property state')).toBeVisible({
      timeout: 10000
    })
  })

  test('after a valid State selected it should validate city blank', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.clickNext()
    await expect(await page.getByText('Please enter a valid property city.')).toBeVisible()
  })

  test('after a valid City selected it should validate address blank', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.setCity()
    await stepOnePage.clickNext()
    await expect(await page.getByText('Please enter a valid property address.')).toBeVisible({
      timeout: 10000
    })
  })

  test('after a valid City selected it should validate postal code blank', async ({
    stepOnePage,
    page
  }) => {
    stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.setCity()
    await stepOnePage.setAddress()
    await stepOnePage.clickNext()
    await expect(await page.getByText('Please enter a valid property postal code.')).toBeVisible({
      timeout: 10000
    })
  })

  test('after a valid Address introduced it should open step 2', async ({ stepOnePage, page }) => {
    stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.setCity()
    await stepOnePage.setAddress()
    await stepOnePage.setZipCode()
    await stepOnePage.clickNext()
    await expect(
      await page.getByRole('heading', { name: 'What property type are you listing?' })
    ).toBeVisible()
    await expect(await page.getByText('Entire Place')).toBeVisible({
      timeout: 10000
    })
    await expect(await page.getByText('Hotel', { exact: true })).toBeVisible({
      timeout: 10000
    })
  })
})

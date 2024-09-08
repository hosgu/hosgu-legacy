import { test, expect } from './fixtures/profile-setup-test'
import { navbarTests } from '../../../../common/navbar'

const url = '/profile/setup?code=1234567890'

test.describe('Navbar', () => {
  test('it should pass all navbar test', async ({ stepOnePage, page }) => {
    await navbarTests(page)
  })
})

test.describe('Profile Setup ', () => {
  test('is should show first page UI elements', async ({ stepOnePage, page }) => {
    await expect(page.getByRole('heading', { name: "Let's start!" })).toBeVisible()
    await expect(page.locator('#step-text')).toContainText('Step 1 of 8')
    await expect(page.locator('div > .bg-gradient-to-r').first()).toBeVisible()
    await expect(page.locator('.bg-gray-500').first()).toBeVisible()
    await expect(page.locator('div > .flex > div:nth-child(3)')).toBeVisible()
    await expect(page.locator('.flex > div:nth-child(4)')).toBeVisible()
    await expect(page.locator('div:nth-child(5)')).toBeVisible()
    await expect(page.locator('.flex > div:nth-child(6)')).toBeVisible()
    await expect(page.locator('.flex > div:nth-child(7)')).toBeVisible()
    await expect(page.locator('div:nth-child(8)')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible()
  })

  test('it should validate password is at least 8 charcters lenght', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.clickNext()
    await expect(page.getByText('Password must be at least 8')).toBeVisible()
  })

  test('it should validate password is at least one upper case charcter', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setLCPassword()
    await stepOnePage.clickNext()
    await expect(page.getByText('Password must contain at least one uppercase')).toBeVisible()
  })

  test('it should validate password is at least one special charcter', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setSCPassword()
    await stepOnePage.clickNext()
    await expect(
      page.getByText('Password must contain at least one special character')
    ).toBeVisible()
  })

  test('after a valid password it should validate propery name is not empty', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await page.getByRole('button', { name: 'Next' }).click()
    await expect(page.getByText('Please enter your property name')).toBeVisible()
  })

  test('after a valid property name it should validate Google Maps link is not empty', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.clickNext()
    await expect(page.getByText('Please enter your Google Maps')).toBeVisible()
  })

  test('after a valid property google maps URL it should validate property state blank', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.clickNext()
    await expect(page.getByText('Please enter your property state')).toBeVisible()
  })

  test('after a valid State selected it should validate city blank', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.clickNext()
    await expect(page.getByText('Please enter a valid property city.')).toBeVisible()
  })

  test('after a valid City selected it should validate address blank', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.setCity()
    await stepOnePage.clickNext()
    await expect(page.getByText('Please enter a valid property address.')).toBeVisible()
  })

  test('after a valid City selected it should validate postal code blank', async ({
    stepOnePage,
    page
  }) => {
    await stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.setCity()
    await stepOnePage.setAddress()
    await stepOnePage.clickNext()
    await expect(page.getByText('Please enter a valid property postal code.')).toBeVisible()
  })

  test('after a valid Address introduced it should open step 2', async ({ stepOnePage, page }) => {
    await stepOnePage.setValidPassword()
    await stepOnePage.setPropertyName()
    await stepOnePage.setGoogleMapsUrl()
    await stepOnePage.setState()
    await stepOnePage.setCity()
    await stepOnePage.setAddress()
    await stepOnePage.setZipcode()
    await stepOnePage.clickNext()
    await expect(
      page.getByRole('heading', { name: 'What property type are you listing?' })
    ).toBeVisible()
    await expect(page.getByText('Entire Place')).toBeVisible()
    await expect(page.getByText('Hotel', { exact: true })).toBeVisible()
  })
})

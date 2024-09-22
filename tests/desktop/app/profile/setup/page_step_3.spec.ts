import { test, expect } from './fixtures/profile-setup-test'
import { StepTwoPage } from './fixtures/step-two-fixtures'

test.describe('Profile Setup Three Two', () => {
  test('It should open step 3 ', async ({ stepOnePage, stepTwoPage, page }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await expect(page.getByRole('heading', { name: 'Information about your Cabin' })).toBeVisible()
    await expect(page.getByRole('main')).toContainText('Guests')
    await expect(page.getByRole('main')).toContainText('Bathrooms')
    await expect(page.getByRole('main')).toContainText('Bedrooms')
    await expect(page.getByRole('main')).toContainText('Beds')
    await expect(await page.getByRole('button', { name: 'Back' })).toBeVisible()
    await expect(await page.getByRole('button', { name: 'Next' })).toBeVisible()
    await expect(await page.locator('#step-text')).toContainText('Step 3 of 8')
  })

  test('It should decrese to 0 each cabin capacity numbers', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickLessGuests()
    await expect(stepThreePage.getGuestsValue()).toHaveValue('0')
    await stepThreePage.clickLessBathRooms()
    await expect(stepThreePage.getBathRoomsValue()).toHaveValue('0')
    await stepThreePage.clickLessBedRooms()
    await expect(stepThreePage.getBedRoomsValue()).toHaveValue('0')
    await stepThreePage.clickLessBeds()
    await expect(stepThreePage.getBedsValue()).toHaveValue('0')
  })

  test('It should increase to 2 each cabin capacity numbers', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickMoreGuests()
    await expect(stepThreePage.getGuestsValue()).toHaveValue('2')
    await stepThreePage.clickMoreBathRooms()
    await expect(stepThreePage.getBathRoomsValue()).toHaveValue('2')
    await stepThreePage.clickMoreBedRooms()
    await expect(stepThreePage.getBedRoomsValue()).toHaveValue('2')
    await stepThreePage.clickMoreBeds()
    await expect(stepThreePage.getBedsValue()).toHaveValue('2')
  })
})

import { test, expect } from './fixtures/profileSetupTest'

test.describe('Profile Setup Step Two', () => {
  test('It should open step 2 ', async ({ stepOnePage, page }) => {
    await stepOnePage.jumpToStep2()
    await expect(
      await page.getByRole('heading', { name: 'What property type are you listing?' })
    ).toBeVisible()
    await expect(await page.getByText('Entire Place')).toBeVisible({
      timeout: 10000
    })
    await expect(await page.getByText('Hotel', { exact: true })).toBeVisible({
      timeout: 10000
    })
    await expect(await page.getByRole('button', { name: 'Back' })).toBeVisible()
    await expect(await page.locator('#step-text')).toContainText('Step 2 of 8')
  })

  test('It should go to cabins page ', async ({ stepOnePage, stepTwoPage, page }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await expect(page.getByRole('heading', { name: 'Information about your Cabin' })).toBeVisible()
  })

  test('It should go to Hotels page', async ({ stepOnePage, stepTwoPage, page }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickHotel()
    await expect(page.getByRole('heading', { name: 'Information about your Hotel' })).toBeVisible()
  })
})

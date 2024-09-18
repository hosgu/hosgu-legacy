import { test, expect } from './fixtures/profile-setup-test'

test.describe('Profile Setup Step Two', () => {
  test('It should open step 2 ', async ({ stepOnePage, page }) => {
    stepOnePage.setValidPassword()
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
  })
})

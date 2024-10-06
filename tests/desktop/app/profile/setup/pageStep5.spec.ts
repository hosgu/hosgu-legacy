import { test, expect } from './fixtures/profileSetupTest'
import { StepTwoPage } from './fixtures/stepTwoFixtures'
import { StepFourPage } from './fixtures/stepFourFixtures'
import { StepFivePage } from './fixtures/stepFiveFixtures'

test.describe('Profile Setup Five page', () => {
  test('It should land on Page 5 ', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    stepFivePage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.jumpToPageFive()
    await expect(await page.locator('#step-text')).toContainText('Step 5 of 8')
  })
  test('It should see default price in US Dollars', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    stepFivePage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.jumpToPageFive()
  })
})

import { test, expect } from './fixtures/profileSetupTest'
import { StepTwoPage } from './fixtures/stepTwoFixtures'
import { StepFourPage } from './fixtures/stepFourFixtures'
import { StepFivePage } from './fixtures/stepFiveFixtures'
import { StepSixPage } from './fixtures/stepSixFixtures'

test.describe('Profile setup Six page', () => {
  test('It should land on Page 6 ', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    stepFivePage,
    stepSixPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.jumpToPageFive()
    await stepFivePage.jumpToPageSix()
    await expect(await stepSixPage.isPageTitleCorrect()).toBe(true)
    await expect(await page.locator('#step-text')).toContainText('Step 6 of 8')
  })
})

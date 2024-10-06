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
    await expect(await stepFivePage.isPageTitleCorrect()).toBe(true)
    await expect(await page.locator('#step-text')).toContainText('Step 5 of 8')
  })
  test('It should set price to 1300 ', async ({
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
    await stepFivePage.setPrice()
    await expect(await stepFivePage.getPrice()).toBe('1300')
  })

  test('It should set currency to MXN ', async ({
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
    await stepFivePage.setPrice()
    await stepFivePage.setCurrency()
    await expect(await stepFivePage.getCurrency()).toBe('MXN')
  })

  test('It should set currency to Check In Hour and Time ', async ({
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
    await stepFivePage.setCheckInHour()
    await expect(await stepFivePage.getCheckInHour()).toBe('02')
    await stepFivePage.setCheckInMin()
    await expect(await stepFivePage.getCheckInMin()).toBe('30')
    await stepFivePage.setCheckInPMAM()
    await expect(await stepFivePage.getCheckInPMAM()).toBe('PM')
  })

  test('It should set currency to Check Out Hour and Time ', async ({
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
    await stepFivePage.setCheckOutHour()
    await expect(await stepFivePage.getCheckOutHour()).toBe('12')
    await stepFivePage.setCheckOutMin()
    await expect(await stepFivePage.getCheckOutMin()).toBe('30')
    await stepFivePage.setCheckOutPMAM()
    await expect(await stepFivePage.getCheckOutPMAM()).toBe('PM')
  })
})

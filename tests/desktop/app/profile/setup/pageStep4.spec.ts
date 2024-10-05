import { test, expect } from './fixtures/profileSetupTest'
import { StepTwoPage } from './fixtures/stepTwoFixtures'
import { StepFourPage } from './fixtures/stepFourFixtures'
import type { Locator } from '@playwright/test'

test.describe('Profile Setup Four ', () => {
  test('It should land on Page 4 ', async ({ stepOnePage, stepTwoPage, stepThreePage, page }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await expect(await page.locator('#step-text')).toContainText('Step 4 of 8')
  })

  test('It should click Wifi button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickWifi()
    await expect(await stepFourPage.isWifiSelected()).toBeVisible()
    await stepFourPage.clickWifi()
    await expect(await stepFourPage.isWifiSelected()).not.toBeVisible()
  })

  test('It should click TV button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickTV()
    await expect(await stepFourPage.isTVSelected()).toBeVisible()
    await stepFourPage.clickTV()
    await expect(await stepFourPage.isTVSelected()).not.toBeVisible()
  })

  test('It should click Kitchen button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickKitchen()
    await expect(await stepFourPage.isKitchenSelected()).toBeVisible()
    await stepFourPage.clickKitchen()
    await expect(await stepFourPage.isKitchenSelected()).not.toBeVisible()
  })

  test('It should click Extra Bed button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickExtraBed()
    await expect(await stepFourPage.isExtraBedSelected()).toBeVisible()
    await stepFourPage.clickExtraBed()
    await expect(await stepFourPage.isExtraBedSelected()).not.toBeVisible()
  })

  test('It should click Refrigerator button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickRefrigerator()
    await expect(await stepFourPage.isRefrigeratorSelected()).toBeVisible()
    await stepFourPage.clickRefrigerator()
    await expect(await stepFourPage.isRefrigeratorSelected()).not.toBeVisible()
  })

  test('It should click Bed Sheets button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickBedSheets()
    await expect(await stepFourPage.isBedSheetsSelected()).toBeVisible()
    await stepFourPage.clickBedSheets()
    await expect(await stepFourPage.isBedSheetsSelected()).not.toBeVisible()
  })

  test('It should click Free Parking button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickFreeParking()
    await expect(await stepFourPage.isFreeParkingSelected()).toBeVisible()
    await stepFourPage.clickFreeParking()
    await expect(await stepFourPage.isFreeParkingSelected()).not.toBeVisible()
  })

  test('It should click Towels button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickTowels()
    await expect(await stepFourPage.isTowelsSelected()).toBeVisible()
    await stepFourPage.clickTowels()
    await expect(await stepFourPage.isTowelsSelected()).not.toBeVisible()
  })

  test('It should click Pool button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickPool()
    await expect(await stepFourPage.isPoolSelected()).toBeVisible()
    await stepFourPage.clickPool()
    await expect(await stepFourPage.isPoolSelected()).not.toBeVisible()
  })

  test('It should click Coffee Machine button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickCoffeMachine()
    await expect(await stepFourPage.isCoffeMachineSelected()).toBeVisible()
    await stepFourPage.clickCoffeMachine()
    await expect(await stepFourPage.isCoffeMachineSelected()).not.toBeVisible()
  })

  test('It should click Hot Water button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickHotWater()
    await expect(await stepFourPage.isHotWaterSelected()).toBeVisible()
    await stepFourPage.clickHotWater()
    await expect(await stepFourPage.isHotWaterSelected()).not.toBeVisible()
  })

  test('It should click Oven button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickOven()
    await expect(await stepFourPage.isOvenSelected()).toBeVisible()
    await stepFourPage.clickOven()
    await expect(await stepFourPage.isOvenSelected()).not.toBeVisible()
  })

  test('It should click AC button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickAC()
    await expect(await stepFourPage.isACSelected()).toBeVisible()
    await stepFourPage.clickAC()
    await expect(await stepFourPage.isACSelected()).not.toBeVisible()
  })

  test('It should click Garden button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickGarden()
    await expect(await stepFourPage.isGardenSelected()).toBeVisible()
    await stepFourPage.clickGarden()
    await expect(await stepFourPage.isGardenSelected()).not.toBeVisible()
  })

  test('It should click Laundry button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickLaundry()
    await expect(await stepFourPage.isLaundrySelected()).toBeVisible()
    await stepFourPage.clickLaundry()
    await expect(await stepFourPage.isLaundrySelected()).not.toBeVisible()
  })

  test('It should click Pet Friendly button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickPetFriendly()
    await expect(await stepFourPage.isPetFriendlySelected()).toBeVisible()
    await stepFourPage.clickPetFriendly()
    await expect(await stepFourPage.isPetFriendlySelected()).not.toBeVisible()
  })

  test('It should click Smoking Area button', async ({
    stepOnePage,
    stepTwoPage,
    stepThreePage,
    stepFourPage,
    page
  }) => {
    await stepOnePage.jumpToStep2()
    await stepTwoPage.clickCabin()
    await stepThreePage.clickNext()
    await stepFourPage.clickSmokingArea()
    await expect(await stepFourPage.isSmokingAreaSelected()).toBeVisible()
    await stepFourPage.clickSmokingArea()
    await expect(await stepFourPage.isSmokingAreaSelected()).not.toBeVisible()
  })
})

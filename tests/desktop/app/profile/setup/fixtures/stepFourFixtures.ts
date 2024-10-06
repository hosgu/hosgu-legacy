import type { Page, Locator } from '@playwright/test'

import { BaseStepPage } from './baseStepFixture'

const WIFI: string = 'Wifi'
const TV: string = 'Tv'
const KITCHEN: string = 'Kitchen'
const EXTRA_BED: string = 'Extra bed'
const REFRIGERATOR: string = 'Refrigerator'
const BED_SHEETS: string = 'Bed sheets'
const FREE_PARKING: string = 'Free Parking'
const TOWELS: string = 'Towels'
const POOL: string = 'Pool'
const COFFEE_MACHINE: string = 'Coffee machine'
const HOT_WATER: string = 'Hot water'
const OVEN: string = 'Oven'
const AC: string = 'AC'
const GARDEN: string = 'Garden'
const LAUNDRY: string = 'Laundry'
const PET_FRIENDLY: string = 'Pet friendly'
const SMOKING_AREA: string = 'Smoking Area'

export class StepFourPage extends BaseStepPage {
  private readonly btnWifi: Locator
  private readonly btnTV: Locator
  private readonly btnKitchen: Locator
  private readonly btnExtraBed: Locator
  private readonly btnRefrigerator: Locator
  private readonly btnBedSheets: Locator
  private readonly btnFreeParking: Locator
  private readonly btnTowels: Locator
  private readonly btnPool: Locator
  private readonly btnCoffeeMachine: Locator
  private readonly btnHotWater: Locator
  private readonly btnOven: Locator
  private readonly btnAC: Locator
  private readonly btnGarden: Locator
  private readonly btnLaundry: Locator
  private readonly btnPetFriendly: Locator
  private readonly btnSmokingArea: Locator
  private readonly gradientEnabled: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.btnWifi = page.getByText(WIFI)
    this.btnTV = page.getByText(TV)
    this.btnKitchen = page.getByText(KITCHEN)
    this.btnExtraBed = page.getByText(EXTRA_BED)
    this.btnRefrigerator = page.getByText(REFRIGERATOR)
    this.btnBedSheets = page.getByText(BED_SHEETS)
    this.btnFreeParking = page.getByText(FREE_PARKING)
    this.btnTowels = page.getByText(TOWELS)
    this.btnPool = page.getByText(POOL)
    this.btnCoffeeMachine = page.getByText(COFFEE_MACHINE)
    this.btnHotWater = page.getByText(HOT_WATER)
    this.btnOven = page.getByText(OVEN)
    this.btnAC = page.getByText(AC, { exact: true })
    this.btnGarden = page.getByText(GARDEN)
    this.btnLaundry = page.getByText(LAUNDRY)
    this.btnPetFriendly = page.getByText(PET_FRIENDLY)
    this.btnSmokingArea = page.getByText(SMOKING_AREA)
    this.gradientEnabled = page.locator('div > .bg-gradient-to-r')
  }

  private async gradientFilter(filter: string) {
    return await this.gradientEnabled.filter({ hasText: filter })
  }
  public async jumpToPageFive() {
    await this.clickWifi()
    await this.clickNext()
  }
  public async clickWifi() {
    await this.btnWifi.click()
  }
  public async isWifiSelected() {
    return this.gradientFilter(WIFI)
  }
  public async clickTV() {
    await this.btnTV.click()
  }
  public async isTVSelected() {
    return this.gradientFilter(TV)
  }
  public async clickKitchen() {
    await this.btnKitchen.click()
  }
  public async isKitchenSelected() {
    return this.gradientFilter(KITCHEN)
  }
  public async clickExtraBed() {
    await this.btnExtraBed.click()
  }
  public async isExtraBedSelected() {
    return this.gradientFilter(EXTRA_BED)
  }
  public async clickRefrigerator() {
    await this.btnRefrigerator.click()
  }
  public async isRefrigeratorSelected() {
    return this.gradientFilter(REFRIGERATOR)
  }
  public async clickBedSheets() {
    await this.btnBedSheets.click()
  }
  public async isBedSheetsSelected() {
    return this.gradientFilter(BED_SHEETS)
  }
  public async clickFreeParking() {
    await this.btnFreeParking.click()
  }
  public async isFreeParkingSelected() {
    return this.gradientFilter(FREE_PARKING)
  }
  public async clickTowels() {
    await this.btnTowels.click()
  }
  public async isTowelsSelected() {
    return this.gradientFilter(TOWELS)
  }
  public async clickPool() {
    await this.btnPool.click()
  }
  public async isPoolSelected() {
    return this.gradientFilter(POOL)
  }
  public async clickCoffeMachine() {
    await this.btnCoffeeMachine.click()
  }
  public async isCoffeMachineSelected() {
    return this.gradientFilter(COFFEE_MACHINE)
  }
  public async clickHotWater() {
    await this.btnHotWater.click()
  }
  public async isHotWaterSelected() {
    return this.gradientFilter(HOT_WATER)
  }
  public async clickOven() {
    await this.btnOven.click()
  }
  public async isOvenSelected() {
    return this.gradientFilter(OVEN)
  }
  public async clickAC() {
    await this.btnAC.click()
  }
  public async isACSelected() {
    return this.gradientFilter(AC)
  }
  public async clickGarden() {
    await this.btnGarden.click()
  }
  public async isGardenSelected() {
    return this.gradientFilter(GARDEN)
  }
  public async clickLaundry() {
    await this.btnLaundry.click()
  }
  public async isLaundrySelected() {
    return this.gradientFilter(LAUNDRY)
  }
  public async clickPetFriendly() {
    await this.btnPetFriendly.click()
  }
  public async isPetFriendlySelected() {
    return this.gradientFilter(PET_FRIENDLY)
  }
  public async clickSmokingArea() {
    await this.btnSmokingArea.click()
  }
  public async isSmokingAreaSelected() {
    return this.gradientFilter(SMOKING_AREA)
  }
}

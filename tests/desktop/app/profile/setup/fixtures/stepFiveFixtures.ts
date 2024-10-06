import type { Page, Locator } from '@playwright/test'

import { BaseStepPage } from './baseStepFixture'

const testPrice = '1300'
const currency = 'MX'
const checkInHour = '2'
const checkInMin = '30'
const checkInPMAM = 'PM'
const checkOutHour = '12'
const checkOutMin = '30'
const checkOutPMAM = 'PM'

export class StepFivePage extends BaseStepPage {
  private readonly pageTitle: Locator
  private readonly inputPrice: Locator
  private readonly selectCurrency: Locator
  private readonly selectCheckInHour: Locator
  private readonly selectCheckInMin: Locator
  private readonly selectCheckInPMAM: Locator
  private readonly selectCheckOutHour: Locator
  private readonly selectCheckOutMin: Locator
  private readonly selectCheckOutPMAM: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.pageTitle = page.getByText('Set your night price and times!')
    this.inputPrice = page.locator('input')
    this.selectCurrency = page.locator('id=currency')
    this.selectCheckInHour = page.locator('id=checkInHour')
    this.selectCheckInMin = page.locator('id=checkInMinute')
    this.selectCheckInPMAM = page.locator('id=checkInPeriod')
    this.selectCheckOutHour = page.locator('id=checkOutHour')
    this.selectCheckOutMin = page.locator('id=checkOutMinute')
    this.selectCheckOutPMAM = page.locator('id=checkOutPeriod')
  }

  async setPrice() {
    await this.inputPrice.click()
    await this.inputPrice.fill(testPrice)
  }
}

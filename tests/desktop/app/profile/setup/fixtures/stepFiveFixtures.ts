import type { Page, Locator } from '@playwright/test'

import { BaseStepPage } from './baseStepFixture'

const testPrice = '1300'
const currency = 'MXN'
const checkInHour = '2'
const checkInMin = '30'
const checkInPMAM = 'PM'
const checkOutHour = '12'
const checkOutMin = '30'
const checkOutPMAM = 'PM'

export class StepFivePage extends BaseStepPage {
  private readonly pageTitle: Locator
  private readonly textPrice: Locator
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
    this.textPrice = page.getByTestId('fixed-price')
    this.inputPrice = page.getByTestId('price')
    this.selectCurrency = page.locator('id=currency')
    this.selectCheckInHour = page.locator('id=checkInHour')
    this.selectCheckInMin = page.locator('id=checkInMinute')
    this.selectCheckInPMAM = page.locator('id=checkInPeriod')
    this.selectCheckOutHour = page.locator('id=checkOutHour')
    this.selectCheckOutMin = page.locator('id=checkOutMinute')
    this.selectCheckOutPMAM = page.locator('id=checkOutPeriod')
  }

  public async isPageTitleCorrect() {
    return (await this.pageTitle.count()) === 1
  }

  public async setPrice() {
    await this.textPrice.click()
    await this.inputPrice.click()
    await this.inputPrice.fill(testPrice)
  }

  public async getPrice() {
    return this.inputPrice.inputValue()
  }
  public async setCurrency() {
    await this.selectCurrency.focus()
    await this.selectCurrency.selectOption(currency)
  }

  public async getCurrency() {
    return await this.selectCurrency.inputValue()
  }

  public async setCheckInHour() {
    await this.selectCheckInHour.click()
    await this.selectCheckInHour.selectOption(checkInHour)
  }

  public async getCheckInHour() {
    return await this.selectCheckInHour.inputValue()
  }
  public async setCheckInMin() {
    await this.selectCheckInMin.click()
    await this.selectCheckInMin.selectOption(checkInMin)
  }

  public async getCheckInMin() {
    return await this.selectCheckInMin.inputValue()
  }

  public async setCheckInPMAM() {
    await this.selectCheckInPMAM.click()
    await this.selectCheckInPMAM.selectOption(checkInPMAM)
  }

  public async getCheckInPMAM() {
    return await this.selectCheckInPMAM.inputValue()
  }

  public async setCheckOutHour() {
    await this.selectCheckOutHour.click()
    await this.selectCheckOutHour.selectOption(checkOutHour)
  }

  public async setCheckOutMin() {
    await this.selectCheckOutMin.click()
    await this.selectCheckOutMin.selectOption(checkOutMin)
  }

  public async setCheckOutPMAM() {
    await this.selectCheckOutPMAM.click()
    await this.selectCheckOutPMAM.selectOption(checkOutPMAM)
  }

  public async getCheckOutHour() {
    return await this.selectCheckOutHour.inputValue()
  }
  public async getCheckOutMin() {
    return await this.selectCheckOutMin.inputValue()
  }

  public async getCheckOutPMAM() {
    return await this.selectCheckOutPMAM.inputValue()
  }
}

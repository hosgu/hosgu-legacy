import type { Page, Locator } from '@playwright/test'
import { BaseStepPage } from './baseStepFixture'

const lcPassword = 'test12345'
const scPassword = 'Test12345'
const validPassword = 'Test#12345'
const propertyName = 'Small Cabins'
const googleMapsUlr = 'https://maps.app.goo.gl/4vYNwGv6btZWQX1g8'
const propertyState = 'Colima'
const propertyCity = 'Colima'
const propertyAddress = 'My town'
const propertyApt = 'Apt 1234'
const propertyZip = '28017'

export class StepOnePage extends BaseStepPage {
  private readonly inputPassword: Locator
  private readonly inputPropertyName: Locator
  private readonly inputGoogleMapsURL: Locator
  private readonly inputPropertyState: Locator
  private readonly inputPropertyCity: Locator
  private readonly inputAddress: Locator
  private readonly inputAptNum: Locator
  private readonly inputZipCode: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.inputPassword = this.page.locator('input[name="password"]')
    this.inputPropertyName = this.page.locator('input[name="propertyName"]')
    this.inputGoogleMapsURL = this.page.getByPlaceholder('https://www.google.com/maps/')
    this.inputPropertyState = this.page.getByRole('combobox')
    this.inputPropertyCity = page.locator('input[name="city"]')
    this.inputAddress = page.locator('input[name="address1"]')
    this.inputAptNum = page.locator('input[name="address2"]')
    this.inputZipCode = page.locator('input[name="zipCode"]')
  }

  async setPassword(text: string) {
    await this.inputPassword.click()
    await this.inputPassword.fill(text)
  }

  public setLCPassword() {
    this.setPassword(lcPassword)
  }

  public setSCPassword() {
    this.setPassword(scPassword)
  }

  public setValidPassword() {
    this.setPassword(validPassword)
  }

  public async setPropertyName() {
    await this.inputPropertyName.click()
    await this.inputPropertyName.fill(propertyName)
  }

  public async setGoogleMapsUrl() {
    await this.inputGoogleMapsURL.click()
    await this.inputGoogleMapsURL.fill(googleMapsUlr)
  }

  public async setState() {
    await this.inputPropertyState.click()
    await this.inputPropertyState.fill(propertyState)
  }

  public async setCity() {
    await this.inputPropertyCity.click()
    await this.inputPropertyCity.fill(propertyCity)
  }

  public async setAddress() {
    await this.inputAddress.fill(propertyAddress)
    await this.inputAptNum.fill(propertyApt)
  }

  public async setZipCode() {
    await this.inputZipCode.click()
    await this.inputZipCode.fill(propertyZip)
  }

  public async jumpToStep2() {
    await this.setValidPassword()
    await this.setPropertyName()
    await this.setGoogleMapsUrl()
    await this.setState()
    await this.setCity()
    await this.setAddress()
    await this.setZipCode()
    await this.clickNext()
  }
}

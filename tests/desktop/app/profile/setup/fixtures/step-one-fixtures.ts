import type { Page, Locator } from '@playwright/test'

const url = '/profile/setup?code=1234567890'
const lcPassword = 'test12345'
const scPassword = 'Test12345'
const validPassword = 'Test#12345'
const propertyName = 'Small Cabins'
const googleMapsUlr = 'https://maps.app.goo.gl/4vYNwGv6btZWQX1g8'
const propertyState = 'Colima'
const propertyCity = 'Colima'
const propertyAddres = 'Mi pueblito'
const propertyApt = 'Apt 1234'
const propertyZip = '28017'

export class StepOnePage {
  private readonly nextButton: Locator
  private readonly inputPassword: Locator
  private readonly inputPropertyName: Locator
  private readonly inputGoogleMapsURL: Locator
  private readonly inputPropertyState: Locator
  private readonly inputProertyCity: Locator
  private readonly inputAddress: Locator
  private readonly inputAptNum: Locator
  private readonly inputZipCode: Locator

  constructor(public readonly page: Page) {
    this.nextButton = this.page.getByRole('button', { name: 'Next' })
    this.inputPassword = this.page.locator('input[name="password"]')
    this.inputPropertyName = this.page.locator('input[name="propertyName"]')
    this.inputGoogleMapsURL = this.page.getByPlaceholder('https://www.google.com/maps/')
    this.inputPropertyState = this.page.getByRole('combobox')
    this.inputProertyCity = page.locator('input[name="city"]')
    this.inputAddress = page.locator('input[name="address1"]')
    this.inputAptNum = page.locator('input[name="address2"]')
    this.inputZipCode = page.locator('input[name="zipCode"]')
  }

  public async goto() {
    await this.page.goto(url)
  }
  public async clickNext() {
    await this.nextButton.click()
  }

  async setPassword(text: string) {
    await this.inputPassword.fill(text)
  }
  public async setLCPassword() {
    await this.setPassword(lcPassword)
  }
  public async setSCPassword() {
    await this.setPassword(scPassword)
  }
  public async setValidPassword() {
    await this.setPassword(validPassword)
  }
  public async setPropertyName() {
    await this.inputPropertyName.fill(propertyName)
  }
  public async setGoogleMapsUrl() {
    await this.inputGoogleMapsURL.fill(googleMapsUlr)
  }
  public async setState() {
    await this.inputPropertyState.fill(propertyState)
  }
  public async setCity() {
    await this.inputProertyCity.fill(propertyCity)
  }

  public async setAddress() {
    await this.inputAddress.fill(propertyAddres)
    await this.inputAptNum.fill(propertyApt)
  }

  public async setZipcode() {
    await this.inputZipCode.fill(propertyZip)
  }
}

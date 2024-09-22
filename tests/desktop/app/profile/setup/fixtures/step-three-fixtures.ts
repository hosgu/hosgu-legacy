import type { Page, Locator } from '@playwright/test'

import { BaseStepPage } from './base-step-fixture'

export class StepThreePage extends BaseStepPage {
  private readonly inputGuests: Locator
  private readonly inputBathRooms: Locator
  private readonly inputBedRooms: Locator
  private readonly inputBeds: Locator
  private readonly buttonMoreGuests: Locator
  private readonly buttonMoreBathRooms: Locator
  private readonly buttonMoreBedRooms: Locator
  private readonly buttonMoreBeds: Locator
  private readonly buttonLessGuests: Locator
  private readonly buttonLessBathRooms: Locator
  private readonly buttonLessBedRooms: Locator
  private readonly buttonLessBeds: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.inputGuests = page.getByTestId('guests')
    this.inputBathRooms = page.getByTestId('bathrooms')
    this.inputBedRooms = page.getByTestId('bedrooms')
    this.inputBeds = page.getByTestId('beds')
    this.buttonMoreGuests = page.getByRole('button', { name: '+' }).first()
    this.buttonMoreBathRooms = page.getByRole('button', { name: '+' }).nth(1)
    this.buttonMoreBedRooms = page.getByRole('button', { name: '+' }).nth(2)
    this.buttonMoreBeds = page.getByRole('button', { name: '+' }).nth(3)
    this.buttonLessGuests = page.getByRole('button', { name: '−' }).first()
    this.buttonLessBathRooms = page.getByRole('button', { name: '−' }).nth(1)
    this.buttonLessBedRooms = page.getByRole('button', { name: '−' }).nth(2)
    this.buttonLessBeds = page.getByRole('button', { name: '−' }).nth(3)
  }

  public getGuestsValue() {
    return this.inputGuests
  }

  public getBathRoomsValue() {
    return this.inputBathRooms
  }

  public getBedRoomsValue() {
    return this.inputBedRooms
  }

  public getBedsValue() {
    return this.inputBeds
  }

  public async clickMoreGuests() {
    await this.buttonMoreGuests.click()
  }

  public async clickMoreBathRooms() {
    await this.buttonMoreBathRooms.click()
  }
  public async clickMoreBedRooms() {
    await this.buttonMoreBedRooms.click()
  }
  public async clickMoreBeds() {
    await this.buttonMoreBeds.click()
  }

  public async clickLessGuests() {
    await this.buttonLessGuests.click()
  }
  public async clickLessBathRooms() {
    await this.buttonLessBathRooms.click()
  }
  public async clickLessBedRooms() {
    await this.buttonLessBedRooms.click()
  }
  public async clickLessBeds() {
    await this.buttonLessBeds.click()
  }
}

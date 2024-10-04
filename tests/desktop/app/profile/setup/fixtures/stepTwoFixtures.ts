import type { Page, Locator } from '@playwright/test'

import { BaseStepPage } from './baseStepFixture'
export class StepTwoPage extends BaseStepPage {
  private readonly imageCabin: Locator
  private readonly imageHotel: Locator

  constructor(public readonly page: Page) {
    super(page)
    this.imageCabin = page.getByRole('img', { name: 'Cabin' })
    this.imageHotel = page.getByRole('img', { name: 'Hotel' })
  }
  public async clickCabin() {
    await this.imageCabin.click()
  }

  public async clickHotel() {
    await this.imageHotel.click()
  }
}

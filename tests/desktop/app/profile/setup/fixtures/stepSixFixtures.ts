import type { Page, Locator } from '@playwright/test'

import { BaseStepPage } from './baseStepFixture'

const fileLocation = './data/'

export class StepSixPage extends BaseStepPage {
  private readonly pageTitle: Locator
  private readonly uploadText: Locator
  constructor(public readonly page: Page) {
    super(page)
    this.pageTitle = page.getByText('Add some photos of your place')
    this.uploadText = page.getByText('Drag your photo here')
  }

  public async isPageTitleCorrect() {
    return (await this.pageTitle.count()) === 1
  }
}

import type { Page, Locator } from '@playwright/test'

const { BASE_URL = 'https://hosgu.dev' } = process.env

const url = BASE_URL + '/profile/setup?code=1234567890'

export class BaseStepPage {
  private readonly nextButton: Locator

  constructor(public readonly page: Page) {
    this.nextButton = this.page.getByRole('button', { name: 'Next' })
  }

  public async goto() {
    console.log(' URL >>>>:', url)
    await this.page.goto(url)
  }

  public async clickNext() {
    await this.nextButton.click()
  }
}

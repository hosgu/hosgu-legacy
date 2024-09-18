import type { Page, Locator } from '@playwright/test'

export class StepTwoPage {
  private readonly nextButton: Locator
  constructor(public readonly page: Page) {
    this.nextButton = this.page.getByRole('button', { name: 'Next' })
  }
  public async clickNext() {
    await this.nextButton.click()
  }
}

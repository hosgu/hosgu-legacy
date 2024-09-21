import { test as base } from '@playwright/test'
import { StepOnePage } from './step-one-fixtures'
import { StepTwoPage } from './step-two-fixtures'

type ProfileSetupFixtures = {
  stepOnePage: StepOnePage
  stepTwoPage: StepTwoPage
}

export const test = base.extend<ProfileSetupFixtures>({
  stepOnePage: async ({ page }, use) => {
    const stepOnePage = new StepOnePage(page)
    await stepOnePage.goto()

    await use(stepOnePage)
  },
  stepTwoPage: async ({ page }, use) => {
    const stepTwoPage = new StepTwoPage(page)
    await stepTwoPage.goto()

    await use(stepTwoPage)
  }
})

export { expect } from '@playwright/test'

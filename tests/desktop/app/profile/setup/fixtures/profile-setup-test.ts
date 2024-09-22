import { test as base } from '@playwright/test'
import { StepOnePage } from './step-one-fixtures'
import { StepTwoPage } from './step-two-fixtures'
import { StepThreePage } from './step-three-fixtures'

type ProfileSetupFixtures = {
  stepOnePage: StepOnePage
  stepTwoPage: StepTwoPage
  stepThreePage: StepThreePage
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
  },
  stepThreePage: async ({ page }, use) => {
    const stepThreePage = new StepThreePage(page)
    await stepThreePage.goto()

    await use(stepThreePage)
  }
})

export { expect } from '@playwright/test'

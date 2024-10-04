import { test as base } from '@playwright/test'
import { StepOnePage } from './stepOneFixtures'
import { StepTwoPage } from './stepTwoFixtures'
import { StepThreePage } from './stepThreeFixtures'
import { StepFourPage } from './stepFourFixtures'

type ProfileSetupFixtures = {
  stepOnePage: StepOnePage
  stepTwoPage: StepTwoPage
  stepThreePage: StepThreePage
  stepFourPage: StepFourPage
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
  },
  stepFourPage: async ({ page }, use) => {
    const stepFourPage = new StepFourPage(page)
    await stepFourPage.goto()

    await use(stepFourPage)
  }
})

export { expect } from '@playwright/test'

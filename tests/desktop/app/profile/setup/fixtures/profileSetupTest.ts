import { test as base } from '@playwright/test'
import { StepOnePage } from './stepOneFixtures'
import { StepTwoPage } from './stepTwoFixtures'
import { StepThreePage } from './stepThreeFixtures'
import { StepFourPage } from './stepFourFixtures'
import { StepFivePage } from './stepFiveFixtures'
import { StepSixPage } from './stepSixFixtures'

type ProfileSetupFixtures = {
  stepOnePage: StepOnePage
  stepTwoPage: StepTwoPage
  stepThreePage: StepThreePage
  stepFourPage: StepFourPage
  stepFivePage: StepFivePage
  stepSixPage: StepSixPage
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
  },
  stepFivePage: async ({ page }, use) => {
    const stepFivePage = new StepFivePage(page)
    await stepFivePage.goto()

    await use(stepFivePage)
  },
  stepSixPage: async ({ page }, use) => {
    const stepSixPage = new StepSixPage(page)
    await stepSixPage.goto()

    await use(stepSixPage)
  }
})

export { expect } from '@playwright/test'

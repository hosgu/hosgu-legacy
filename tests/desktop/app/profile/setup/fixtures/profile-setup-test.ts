import { test as base } from '@playwright/test'
import { StepOnePage } from './step-one-fixtures'

type ProfileSetupFixtures = {
  stepOnePage: StepOnePage
}

export const test = base.extend<ProfileSetupFixtures>({
  stepOnePage: async ({ page }, use) => {
    const stepOnePage = new StepOnePage(page)
    await stepOnePage.goto()

    await use(stepOnePage)
  }
})

export { expect } from '@playwright/test'

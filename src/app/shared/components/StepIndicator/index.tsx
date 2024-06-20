import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'
import Button from '~/components/Button'
import { RenderIf } from '@architecturex/components.renderif'
import i18n from '~/app/shared/contexts/server/I18nContext'

interface StepIndicatorProps {
  locale: string
  steps: number
  currentStep: number
}

const StepIndicator: FC<StepIndicatorProps> = ({ locale, steps, currentStep }) => {
  const t = i18n(locale)

  return (
    <div className="flex justify-center items-center w-full flex-col mt-3">
      <div className="flex space-x-1">
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={`${
              index < currentStep ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-500'
            } rounded-sm w-3 h-3`}
          ></div>
        ))}
      </div>

      <p id="step-text" className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
        {t('profile.setup.step.step')} {currentStep} {t('profile.setup.step.of')} {steps}
        {/* {`${t('profile.setup.step')} ${currentStep} ${t('profile.setup.step.of')} ${steps}`} */}
      </p>
    </div>
  )
}

export default StepIndicator

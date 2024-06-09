import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'
import Button from '~/components/Button'
import { RenderIf } from '@architecturex/components.renderif'

interface StepIndicatorProps {
  steps: number
  currentStep: number
}

const StepIndicator: FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center items-center w-full flex-col mt-10">
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

      <p id="step-text" className="mt-2 text-gray-600 dark:text-gray-300">
        Step {currentStep} of {steps}
      </p>
    </div>
  )
}

export default StepIndicator

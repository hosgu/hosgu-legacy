import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'
import Button from '~/components/Button'

interface StepIndicatorProps {
  steps: number
  currentStep: number
  onBack: () => void
  onNext: () => void
}

const StepIndicator: FC<StepIndicatorProps> = ({ steps, currentStep, onClick, onBack, onNext }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full mb-4">
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={`flex-1 h-1 ${index < currentStep ? 'bg-forest' : 'bg-gray-300'} ${
              index !== 0 ? 'ml-2' : ''
            } ${index !== steps - 1 ? 'mr-2' : ''}`}
          ></div>
        ))}
      </div>
      <div className="flex w-full justify-between">
        <a
          onClick={onBack}
          className={cx.join('py-2 px-4 cursor-pointer', { invisible: currentStep === 0 })}
        >
          Back
        </a>

        <Button color="secondary" onClick={onNext} disabled={currentStep === steps - 1}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default StepIndicator

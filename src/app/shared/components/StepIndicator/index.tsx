import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'
import Button from '~/components/Button'
import { RenderIf } from '@architecturex/components.renderif'

interface StepIndicatorProps {
  steps: number
  currentStep: number
  onBack: () => void
  onNext: () => void
  enableNext: boolean
}

const StepIndicator: FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onBack,
  onNext,
  enableNext
}) => {
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
          className={cx.join('py-2 px-4 cursor-pointer', {
            invisible: currentStep === 0
          })}
        >
          Back
        </a>
        <RenderIf isTrue={currentStep !== 1}>
          <Button
            color="secondary"
            onClick={onNext}
            disabled={currentStep === steps || !enableNext}
          >
            {currentStep === steps - 1 ? 'Submit' : 'Next'}
          </Button>
        </RenderIf>
      </div>
    </div>
  )
}

export default StepIndicator

import React, { FC, Fragment } from 'react'

type Props = {
  totalSteps: number
  currentStep: number
}

const StepIndicator: FC<Props> = ({ totalSteps, currentStep }) => {
  const stepDots = []

  for (let i = 1; i <= totalSteps; i++) {
    const isActive = i <= currentStep

    stepDots.push(
      <Fragment key={i}>
        <div
          className={`w-6 h-6 ${isActive ? 'bg-green-500' : 'bg-gray-300'} rounded-full mr-1`}
        ></div>
        {i < totalSteps && (
          <div
            className={`w-8 h-1 ${isActive ? 'bg-green-500' : 'bg-gray-300'} rounded mr-1`}
          ></div>
        )}
      </Fragment>
    )
  }

  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex items-center">{stepDots}</div>
    </div>
  )
}

export default StepIndicator

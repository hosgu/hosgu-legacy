'use client'
import React, { FC, useState } from 'react'
import { Button } from '@architecturex/components.button'
import { Switcher } from '@architecturex/components.switcher'
import cx from '@architecturex/utils.cx'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
}

const Pricing: FC<Props> = ({ t }) => {
  const [isYearly, setIsYearly] = useState(false)

  const plansData = [
    {
      name: t.free,
      monthlyPrice: 0,
      features: ['Feature 1', 'Feature 2']
    },
    {
      name: t.basic,
      monthlyPrice: 10,
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
    },
    {
      name: t.enterprise,
      monthlyPrice: 50,
      features: ['All Features', 'Priority Support']
    }
  ]

  return (
    <div data-component="Pricing" className="bg-gray-100 px-8 py-20 dark:bg-black">
      <h2 className="font-bold mb-10 text-3xl text-center dark:text-white">{t.pricing}</h2>

      <div className="flex items-center justify-center mb-6">
        <span className="mr-2 dark:text-white">{t.monthly}</span>
        <Switcher color="success" onChange={() => setIsYearly(!isYearly)} />
        <span className="ml-2 dark:text-white">
          {t.yearly} (10% {t.off})
        </span>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        {plansData.map((plan) => (
          <div
            key={plan.name}
            className={cx.join(
              'border flex flex-col md:p-6 p-4 rounded w-full md:w-auto lg:w-auto',
              {
                'bg-spring shadow-lg': plan.name === 'Basic',
                'shadow-md bg-slate-50': plan.name !== 'Basic'
              }
            )}
          >
            <h3
              className={cx.join('font-bold mb-4 text-2xl text-center', {
                'text-green-600': plan.name === 'Basic'
              })}
            >
              {plan.name}
            </h3>

            <div className="font-bold mb-6 text-3xl text-center">
              ${isYearly ? (plan.monthlyPrice * 12 * 0.9).toFixed(2) : plan.monthlyPrice}/
              {isYearly ? 'yr' : 'mo'}
            </div>

            <ul className="flex-grow mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex justify-center items-center">
              <Button shape="circle" size="medium" className="w-30">
                {t.getStarted}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing

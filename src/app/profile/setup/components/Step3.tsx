'use client'
import React, { FC, useEffect, useState } from 'react'

import Counter from '~/components/Counter'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  values: any
  setValues: any
  enableNext: boolean
  setEnableNext: any
}

const Step: FC<Props> = ({ locale, values, setValues, setEnableNext }) => {
  const { guests, bathrooms, bedrooms, beds } = values

  useEffect(() => {
    if (guests === 0 || bathrooms === 0 || bedrooms === 0 || beds === 0) {
      setEnableNext(false)
      return
    }
    setEnableNext(true)
  }, [guests, bathrooms, bedrooms, beds, setEnableNext])

  const t = i18n(locale)

  return (
    <div className="flex flex-col space-y-4 w-96">
      <div className="bg-white dark:bg-gray-900 p-2 rounded-xl text-black dark:text-white">
        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Guests</p>

          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, guests: count })
            }}
            defaultValue={guests}
            max={25}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>
        <hr className="border-solid dark:border-gray-700" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Bathrooms</p>

          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, bathrooms: count })
            }}
            max={10}
            defaultValue={bathrooms}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>
        <hr className="border-solid	dark:border-gray-700" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Bedrooms</p>
          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, bedrooms: count })
            }}
            defaultValue={bedrooms}
            max={6}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>

        <hr className="border-solid	dark:border-gray-700" />

        <div className="flex flex-row justify-between  items-center space-x-2 my-6">
          <p>Beds</p>
          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, beds: count })
            }}
            defaultValue={beds}
            max={6}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Step

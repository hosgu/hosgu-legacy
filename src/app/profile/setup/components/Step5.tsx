'use client'
import React, { FC, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import cx from '@architecturex/utils.cx'

import Link from '~/app/shared/components/Link'
import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  values: any
  setValues: any
  enableNext: boolean
  setEnableNext: any
}

const Step: FC<Props> = ({ locale, setStep, setValues, values, setEnableNext }) => {
  const { priceNights, cleaningFee, extraPersonPrice, checkIn, checkOut } = values

  useEffect(() => {
    if (
      priceNights === 0 ||
      cleaningFee === 0 ||
      extraPersonPrice === 0 ||
      checkIn === '' ||
      checkOut === ''
    ) {
      setEnableNext(false)
      return
    }
    setEnableNext(true)
  }, [priceNights, setEnableNext, cleaningFee, extraPersonPrice, checkIn, checkOut])

  return (
    <div className="flex flex-col justify-between space items-center text-center w-full max-w-[500px] ">
      <div className="flex flex-row">
        <div className={cx.join('p-4 text-left')}>
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300 "
          >
            price per night
          </label>
          <NumericFormat
            prefix={'$'}
            className={cx.join(
              'w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg w-lg'
            )}
            value={priceNights}
            allowLeadingZeros
            thousandSeparator=","
            onChange={(e: any) => setValues({ ...values, priceNights: e.target.value })}
          />
        </div>

        <div className={cx.join('p-4 text-left')}>
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          >
            cleaning fee
          </label>
          <NumericFormat
            prefix={'$'}
            className={cx.join(
              'w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg w-lg'
            )}
            value={cleaningFee}
            allowLeadingZeros
            thousandSeparator=","
            onChange={(e: any) => setValues({ ...values, cleaningFee: e.target.value })}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <div className={cx.join('p-4 text-left')}>
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          >
            price per extra person
          </label>
          <NumericFormat
            prefix={'$'}
            className={cx.join(
              'w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg w-lg'
            )}
            value={extraPersonPrice}
            allowLeadingZeros
            thousandSeparator=","
            onChange={(e: any) => setValues({ ...values, extraPersonPrice: e.target.value })}
          />
        </div>
        <div className="flex flex-row w-9/12">
          <Input
            value={checkIn}
            label="Check-In"
            type="time"
            className="rounded-lg w-lg"
            onChange={(e: any) => setValues({ ...values, checkIn: e.target.value })}
          />
          <Input
            value={checkOut}
            label="Check-Out"
            type="time"
            className="rounded-lg w-lg"
            onChange={(e: any) => setValues({ ...values, checkOut: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export default Step

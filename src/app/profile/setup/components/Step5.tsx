'use client'
import React, { FC } from 'react'
import Link from '~/app/shared/components/Link'
import Checkbox from '~/components/Checkbox'
import Input from '~/components/Input'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  values: any
  setValues: any
}

const Step: FC<Props> = ({ locale, setStep, setValues, values }) => {
  const { priceNights, cleaningFee, extraPersonPrice, checkIn, checkOut } = values

  return (
    <div className="flex flex-col justify-between space items-center text-center w-full max-w-[500px] ">
      <div className="flex flex-row">
        <Input
          value={priceNights}
          label="Price per night"
          className="rounded-lg w-lg"
          type="number"
          onChange={(e: any) => setValues({ ...values, priceNights: e.target.value })}
        />{' '}
        <Input
          value={cleaningFee}
          label="cleaning fee"
          type="number"
          className="rounded-lg w-lg"
          onChange={(e: any) => setValues({ ...values, cleaningFee: e.target.value })}
        />
      </div>
      <div className="flex flex-row">
        <Input
          value={extraPersonPrice}
          label="price per extra person"
          className="rounded-lg w-lg"
          type="number"
          onChange={(e: any) => setValues({ ...values, extraPersonPrice: e.target.value })}
        />
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

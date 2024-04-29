'use client'
import React, { FC } from 'react'
import CheckCard from '~/components/CheckCard'

type Props = {
  locale: string
  values: any
  setValues: any
  setStep: (prevState: any) => void
}

const Step: FC<Props> = ({ locale, setStep, values, setValues }) => {
  const { amenities } = values

  const onChangeCheck = (name: string) => {
    let value = amenities.get(name)
    amenities.set(name, !value)
    setValues({ ...values, amenities: amenities })
  }
  return (
    <div className=" flex flex-col items-center   h-[60vh] overflow-scroll ">
      <div className="flex flex-wrap flex-row  justify-between items-left text-center ">
        <CheckCard
          label="Wifi"
          checked={amenities.get('wifi')}
          icon="/images/icons/wifi.png"
          onChange={() => onChangeCheck('wifi')}
        />
        <CheckCard
          label="Tv"
          checked={amenities.get('tv')}
          icon="/images/icons/tv-icon.svg"
          onChange={() => onChangeCheck('tv')}
        />
        <CheckCard
          label="Kitchen"
          checked={amenities.get('kitchen')}
          icon="/images/icons/kitchen.svg"
          onChange={() => onChangeCheck('kitchen')}
        />
        <CheckCard
          label="Extra bed"
          checked={amenities.get('extraBed')}
          icon="/images/icons/extra-bed.svg"
          onChange={() => onChangeCheck('extraBed')}
        />
        <CheckCard
          label="Refrigerator"
          checked={amenities.get('refrigerator')}
          icon="/images/icons/refrigerator.svg"
          onChange={() => onChangeCheck('refrigerator')}
        />
        <CheckCard
          label="Bed sheets"
          checked={amenities.get('bedSheets')}
          icon="/images/icons/bed-sheets.svg"
          onChange={() => onChangeCheck('bedSheets')}
        />
        <CheckCard
          label="Free parking"
          checked={amenities.get('freeParking')}
          icon="/images/icons/parking.svg"
          onChange={() => onChangeCheck('freeParking')}
        />
        <CheckCard
          label="Kitchen basics"
          checked={amenities.get('kitchenBasics')}
          icon="/images/icons/kbasics.svg"
          onChange={() => onChangeCheck('kitchenBasics')}
        />
        <CheckCard
          label="Towels"
          checked={amenities.get('towels')}
          icon="/images/icons/towels.svg"
          onChange={() => onChangeCheck('towels')}
        />
        <CheckCard
          label="Pool"
          checked={amenities.get('pool')}
          icon="/images/icons/pool.svg"
          onChange={() => onChangeCheck('pool')}
        />
        <CheckCard
          label="Coffee machine"
          checked={amenities.get('coffeeMachine')}
          icon="/images/icons/coffee-machine.svg"
          onChange={() => onChangeCheck('coffeeMachine')}
        />

        <CheckCard
          label="Hot water"
          checked={amenities.get('hotWater')}
          icon="/images/icons/hotwater.svg"
          onChange={() => onChangeCheck('hotWater')}
        />
        <CheckCard
          label="Oven"
          checked={amenities.get('oven')}
          icon="/images/icons/oven.svg"
          onChange={() => onChangeCheck('oven')}
        />
        <CheckCard
          label="AC"
          checked={amenities.get('ac')}
          icon="/images/icons/ac.svg"
          onChange={() => onChangeCheck('ac')}
        />
        <CheckCard
          label="Garden"
          checked={amenities.get('garden')}
          icon="/images/icons/garden.svg"
          onChange={() => onChangeCheck('garden')}
        />
        <CheckCard
          label="glasses and plates"
          checked={amenities.get('glassesPlates')}
          icon="/images/icons/dishes.svg"
          onChange={() => onChangeCheck('glassesPlates')}
        />
        <CheckCard
          label="Laundry"
          checked={amenities.get('laundry')}
          icon="/images/icons/laundry.svg"
          onChange={() => onChangeCheck('laundry')}
        />
        <CheckCard
          label="Pet friendly"
          checked={amenities.get('petFriendly')}
          icon="/images/icons/pet.svg"
          onChange={() => onChangeCheck('petFriendly')}
        />
        <CheckCard
          label="Smoking area"
          checked={amenities.get('smoking')}
          icon="/images/icons/smoking.svg"
          onChange={() => onChangeCheck('smoking')}
        />
      </div>
    </div>
  )
}

export default Step

'use client'
import React, { FC, useEffect } from 'react'
import SVG from '@architecturex/components.svg'
import CheckCard from '~/components/CheckCard'
import { useTheme } from '~/app/shared/contexts/client/ThemeContext'

type Props = {
  locale: string
  values: any
  setValues: any
  setStep: (prevState: any) => void
  setEnableNext: any
}

const Step: FC<Props> = ({ locale, setStep, values, setValues, setEnableNext }) => {
  const { amenities } = values
  const { darkMode } = useTheme()

  useEffect(() => {
    const currentValues = Array.from(values.amenities.values())
    setEnableNext(currentValues.includes(true))
  }, [])

  const onChangeCheck = (name: string) => {
    let value = amenities.get(name)

    amenities.set(name, !value)
    setValues({ ...values, amenities: amenities })

    const currentValues = Array.from(values.amenities.values())

    if (currentValues.includes(true)) {
      setEnableNext(true)
    } else {
      setEnableNext(false)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <CheckCard
        label="Wifi"
        checked={amenities.get('wifi')}
        icon={
          <SVG.Wifi
            size="32px"
            alternativeColor={darkMode || amenities.get('wifi') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('wifi')}
      />
      <CheckCard
        label="Tv"
        checked={amenities.get('tv')}
        icon={
          <SVG.TV size="32px" alternativeColor={darkMode || amenities.get('wifi') ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('tv')}
      />
      <CheckCard
        label="Kitchen"
        checked={amenities.get('kitchen')}
        icon={
          <SVG.Kitchen
            size="32px"
            alternativeColor={darkMode || amenities.get('wifi') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('kitchen')}
      />
      <CheckCard
        label="Extra bed"
        checked={amenities.get('extraBed')}
        icon={
          <SVG.Bed
            size="32px"
            alternativeColor={darkMode || amenities.get('extraBed') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('extraBed')}
      />
      <CheckCard
        label="Refrigerator"
        checked={amenities.get('refrigerator')}
        icon={
          <SVG.Refrigerator
            size="32px"
            alternativeColor={darkMode || amenities.get('refrigerator') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('refrigerator')}
      />
      <CheckCard
        label="Bed sheets"
        checked={amenities.get('bedSheets')}
        icon={
          <SVG.Bed
            size="32px"
            alternativeColor={darkMode || amenities.get('bedSheets') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('bedSheets')}
      />
      <CheckCard
        label="Free parking"
        checked={amenities.get('freeParking')}
        icon={
          <SVG.Parking
            size="32px"
            alternativeColor={darkMode || amenities.get('freeParking') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('freeParking')}
      />
      <CheckCard
        label="Towels"
        checked={amenities.get('towels')}
        icon={
          <SVG.Towel
            size="32px"
            alternativeColor={darkMode || amenities.get('towels') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('towels')}
      />
      <CheckCard
        label="Pool"
        checked={amenities.get('pool')}
        icon={
          <SVG.Swim
            size="32px"
            alternativeColor={darkMode || amenities.get('pool') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('pool')}
      />
      <CheckCard
        label="Coffee machine"
        checked={amenities.get('coffeeMachine')}
        icon={
          <SVG.Coffee
            size="32px"
            alternativeColor={darkMode || amenities.get('coffeeMachine') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('coffeeMachine')}
      />

      <CheckCard
        label="Hot water"
        checked={amenities.get('hotWater')}
        icon={
          <SVG.HotWater
            size="32px"
            alternativeColor={darkMode || amenities.get('hotWater') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('hotWater')}
      />
      <CheckCard
        label="Oven"
        checked={amenities.get('oven')}
        icon={
          <SVG.Oven
            size="32px"
            alternativeColor={darkMode || amenities.get('oven') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('oven')}
      />
      <CheckCard
        label="AC"
        checked={amenities.get('ac')}
        icon={
          <SVG.AC size="32px" alternativeColor={darkMode || amenities.get('ac') ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('ac')}
      />
      <CheckCard
        label="Garden"
        checked={amenities.get('garden')}
        icon={
          <SVG.Garden
            size="32px"
            alternativeColor={darkMode || amenities.get('garden') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('garden')}
      />
      <CheckCard
        label="Laundry"
        checked={amenities.get('laundry')}
        icon={
          <SVG.Laundry
            size="32px"
            alternativeColor={darkMode || amenities.get('laundry') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('laundry')}
      />
      {/* <CheckCard
        label="Pet friendly"
        checked={amenities.get('petFriendly')}
        icon="/images/icons/pet.svg"
        onChange={() => onChangeCheck('petFriendly')}
      /> */}
      {/* <CheckCard
        label="Smoking area"
        checked={amenities.get('smoking')}
        icon="/images/icons/smoking.svg"
        onChange={() => onChangeCheck('smoking')}
      /> */}
    </div>
  )
}

export default Step

'use client'
import React, { FC, useEffect } from 'react'
import SVG from '@architecturex/components.svg'
import CheckCard from '~/components/CheckCard'
import { useTheme } from '~/app/shared/contexts/client/ThemeContext'
import i18n from '~/app/shared/contexts/server/I18nContext'

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
  const t = i18n(locale)

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
          <SVG.TV size="32px" alternativeColor={darkMode || amenities.get('tv') ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('tv')}
      />
      <CheckCard
        label={t('profile.setup.step4.kitchen')}
        checked={amenities.get('kitchen')}
        icon={
          <SVG.Kitchen
            size="42px"
            alternativeColor={darkMode || amenities.get('kitchen') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('kitchen')}
      />
      <CheckCard
        label={t('profile.setup.step4.extraBed')}
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
        label={t('profile.setup.step4.refrigerator')}
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
        label={t('profile.setup.step4.bedSheets')}
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
        label={t('profile.setup.step4.freeParking')}
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
        label={t('profile.setup.step4.towels')}
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
        label={t('profile.setup.step4.pool')}
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
        label={t('profile.setup.step4.coffeeMachine')}
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
        label={t('profile.setup.step4.hotWater')}
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
        label={t('profile.setup.step4.oven')}
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
        label={t('profile.setup.step4.ac')}
        checked={amenities.get('ac')}
        icon={
          <SVG.AC size="32px" alternativeColor={darkMode || amenities.get('ac') ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('ac')}
      />
      <CheckCard
        label={t('profile.setup.step4.garden')}
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
        label={t('profile.setup.step4.laundry')}
        checked={amenities.get('laundry')}
        icon={
          <SVG.Laundry
            size="32px"
            alternativeColor={darkMode || amenities.get('laundry') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('laundry')}
      />
      <CheckCard
        label="Pet friendly"
        checked={amenities.get('petFriendly')}
        icon={
          <SVG.Pet size="32px" alternativeColor={darkMode || amenities.get('pet') ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('petFriendly')}
      />
      <CheckCard
        label={t('profile.setup.step4.smokingArea')}
        checked={amenities.get('smoking')}
        icon={
          <SVG.Smoke
            size="32px"
            alternativeColor={darkMode || amenities.get('smoking') ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('smoking')}
      />
    </div>
  )
}

export default Step

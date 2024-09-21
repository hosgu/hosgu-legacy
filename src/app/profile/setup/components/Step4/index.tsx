'use client'
import React, { FC, useEffect } from 'react'
import SVG from '@architecturex/components.svg'
import CheckCard from '~/components/CheckCard'
import { useTheme } from '~/app/core/contexts/client/ThemeContext'
import i18n from '~/app/core/contexts/server/I18nContext'

type Props = {
  locale: string
  values: any
  setValues: any
  setEnableNext: any
}

const Step: FC<Props> = ({ locale, values, setValues, setEnableNext }) => {
  const { amenities } = values
  const { darkMode } = useTheme()
  const t = i18n(locale)

  useEffect(() => {
    const currentValues = Array.from(Object.values(values.amenities))
    setEnableNext(currentValues.includes(true))
  }, [])

  const onChangeCheck = (name: string) => {
    let value = amenities[name]

    amenities[name] = !value
    setValues({ ...values, amenities })

    const currentValues = Array.from(Object.values(values.amenities))

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
        checked={amenities.wifi}
        icon={<SVG.Wifi size="32px" alternativeColor={darkMode || amenities.wifi ? '#fff' : ''} />}
        onChange={() => onChangeCheck('wifi')}
      />
      <CheckCard
        label="Tv"
        checked={amenities.tv}
        icon={<SVG.TV size="32px" alternativeColor={darkMode || amenities.tv ? '#fff' : ''} />}
        onChange={() => onChangeCheck('tv')}
      />
      <CheckCard
        label={t('profile.setup.step4.kitchen')}
        checked={amenities.kitchen}
        icon={
          <SVG.Kitchen size="42px" alternativeColor={darkMode || amenities.kitchen ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('kitchen')}
      />
      <CheckCard
        label={t('profile.setup.step4.extraBed')}
        checked={amenities.extraBed}
        icon={
          <SVG.Bed size="32px" alternativeColor={darkMode || amenities.extraBed ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('extraBed')}
      />
      <CheckCard
        label={t('profile.setup.step4.refrigerator')}
        checked={amenities.refrigerator}
        icon={
          <SVG.Refrigerator
            size="32px"
            alternativeColor={darkMode || amenities.refrigerator ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('refrigerator')}
      />
      <CheckCard
        label={t('profile.setup.step4.bedSheets')}
        checked={amenities.bedSheets}
        icon={
          <SVG.Bed size="32px" alternativeColor={darkMode || amenities.bedSheets ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('bedSheets')}
      />
      <CheckCard
        label={t('profile.setup.step4.freeParking')}
        checked={amenities.freeParking}
        icon={
          <SVG.Parking
            size="32px"
            alternativeColor={darkMode || amenities.freeParking ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('freeParking')}
      />
      <CheckCard
        label={t('profile.setup.step4.towels')}
        checked={amenities.towels}
        icon={
          <SVG.Towel size="32px" alternativeColor={darkMode || amenities.towels ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('towels')}
      />
      <CheckCard
        label={t('profile.setup.step4.pool')}
        checked={amenities.pool}
        icon={<SVG.Swim size="32px" alternativeColor={darkMode || amenities.pool ? '#fff' : ''} />}
        onChange={() => onChangeCheck('pool')}
      />
      <CheckCard
        label={t('profile.setup.step4.coffeeMachine')}
        checked={amenities.coffeeMachine}
        icon={
          <SVG.Coffee
            size="32px"
            alternativeColor={darkMode || amenities.coffeeMachine ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('coffeeMachine')}
      />

      <CheckCard
        label={t('profile.setup.step4.hotWater')}
        checked={amenities.hotWater}
        icon={
          <SVG.HotWater
            size="32px"
            alternativeColor={darkMode || amenities.hotWater ? '#fff' : ''}
          />
        }
        onChange={() => onChangeCheck('hotWater')}
      />
      <CheckCard
        label={t('profile.setup.step4.oven')}
        checked={amenities.oven}
        icon={<SVG.Oven size="32px" alternativeColor={darkMode || amenities.oven ? '#fff' : ''} />}
        onChange={() => onChangeCheck('oven')}
      />
      <CheckCard
        label={t('profile.setup.step4.ac')}
        checked={amenities.ac}
        icon={<SVG.AC size="32px" alternativeColor={darkMode || amenities.ac ? '#fff' : ''} />}
        onChange={() => onChangeCheck('ac')}
      />
      <CheckCard
        label={t('profile.setup.step4.garden')}
        checked={amenities.garden}
        icon={
          <SVG.Garden size="32px" alternativeColor={darkMode || amenities.garden ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('garden')}
      />
      <CheckCard
        label={t('profile.setup.step4.laundry')}
        checked={amenities.laundry}
        icon={
          <SVG.Laundry size="32px" alternativeColor={darkMode || amenities.laundry ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('laundry')}
      />
      <CheckCard
        label="Pet friendly"
        checked={amenities.petFriendly}
        icon={
          <SVG.Pet size="32px" alternativeColor={darkMode || amenities.petFriendly ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('petFriendly')}
      />
      <CheckCard
        label={t('profile.setup.step4.smokingArea')}
        checked={amenities.smoking}
        icon={
          <SVG.Smoke size="32px" alternativeColor={darkMode || amenities.smoking ? '#fff' : ''} />
        }
        onChange={() => onChangeCheck('smoking')}
      />
    </div>
  )
}

export default Step

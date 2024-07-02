import React, { FC, useEffect } from 'react'

import CabinSetup from './CabinSetup'
import HotelSetup from './HotelSetup'

type Props = {
  locale: string
  values: any
  setValues: any
  setEnableNext: any
}

const Step: FC<Props> = ({ locale, values, setValues, setEnableNext }) => {
  const { guests, bathrooms, bedrooms, beds } = values

  // Handlers for setting new values
  const handleGuestsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      guests: count
    }))
  }

  const handleBathroomsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      bathrooms: count
    }))
  }

  const handleBedroomsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      bedrooms: count
    }))
  }

  const handleBedsChange = (count: number) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      beds: count
    }))
  }

  useEffect(() => {
    // Validation logic if needed
    if (guests === 0 || bathrooms === 0 || bedrooms === 0 || beds === 0) {
      setEnableNext(false)
    } else {
      setEnableNext(true)
    }
  }, [guests, bathrooms, bedrooms, beds, setEnableNext])

  if (values.propertyType === 'cabin') {
    return (
      <CabinSetup
        locale={locale}
        values={values}
        setValues={setValues}
        setEnableNext={setEnableNext}
      />
    )
  }

  return (
    <HotelSetup
      locale={locale}
      values={values}
      setValues={setValues}
      setEnableNext={setEnableNext}
    />
  )
}

export default Step

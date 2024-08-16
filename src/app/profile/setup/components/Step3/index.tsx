import React, { FC, useEffect } from 'react'

import CabinSetup from './CabinSetup'
import HotelSetup from './HotelSetup'

type Props = {
  locale: string
  values: any
  setValues: any
  setEnableNext: any
  setParentRooms: any
  setParentFloors: any
  setParentSkipFloor13: any
  parentRooms: any
  parentFloors: any
  parentSkipFloor13: any
}

const Step: FC<Props> = ({
  locale,
  values,
  setValues,
  setEnableNext,
  setParentFloors,
  setParentRooms,
  setParentSkipFloor13,
  parentFloors,
  parentRooms,
  parentSkipFloor13
}) => {
  const { guests, bathrooms, bedrooms, beds } = values

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
      setParentFloors={setParentFloors}
      setParentRooms={setParentRooms}
      setParentSkipFloor13={setParentSkipFloor13}
      parentFloors={parentFloors}
      parentRooms={parentRooms}
      parentSkipFloor13={parentSkipFloor13}
    />
  )
}

export default Step

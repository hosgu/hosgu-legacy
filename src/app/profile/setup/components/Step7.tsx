import React, { FC } from 'react'

// Define the type for our props
interface PropertyValues {
  userId: string
  email: string
  password: string
  propertyName: string
  propertyType: string
  address1: string
  address2: string
  city: string
  state: string
  zipCode: string
  guests: number
  bathrooms: number
  bedrooms: number
  beds: number
  cabinPrice: number
  hotelPrice: number
  currency: string
  checkIn: string
  checkOut: string
  images: string[]
  tmpImages: { base64: string }[]
  amenities: Map<string, boolean>
}

interface StepProps {
  locale: string
  setValues: any
  values: PropertyValues
}

const Step: FC<{ values: PropertyValues }> = ({ values }) => {
  return (
    <div className="mx-auto p-6 bg-white w-full flex">
      <div className="w-full m-auto">
        <h1 className="text-2xl font-semibold mb-4">{values.propertyName}</h1>
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Property Image */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <img
              src={values.tmpImages[0].base64}
              alt={values.propertyName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Property Details */}
          <div className="w-full md:w-1/2 lg:w-2/3 p-4 mx-auto">
            <p className="text-lg font-semibold">
              Price: ${values.cabinPrice} {values.currency} per night
            </p>
            <p className="mt-2">
              Location: {values.city}, {values.state}, {values.zipCode}
            </p>
            <p className="mt-2">
              Guests: {values.guests} | Bedrooms: {values.bedrooms} | Bathrooms: {values.bathrooms}
            </p>
            <div className="mt-4">
              <h2 className="font-semibold">Amenities:</h2>
              <ul className="list-disc pl-5 mt-2">
                {Array.from(values.amenities.entries()).map(
                  ([amenity, available]) => available && <li key={amenity}>{amenity}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step

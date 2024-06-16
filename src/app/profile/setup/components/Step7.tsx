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
  amenities: Map<string, boolean>
}

interface StepProps {
  locale: string
  setValues: any
  values: PropertyValues
}

const PropertyPreview: FC<{ values: PropertyValues }> = ({ values }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{values.propertyName}</h1>
      <div className="flex space-x-4">
        {/* Property Image */}
        <div className="w-1/3">
          <img
            src="https://via.placeholder.com/150"
            alt={values.propertyName}
            className="w-full h-auto rounded"
          />
        </div>
        {/* Property Details */}
        <div className="w-2/3 space-y-2">
          <p className="text-lg font-semibold">Price: ${values.cabinPrice} per night</p>
          <p>
            Location: {values.city}, {values.state}, {values.zipCode}
          </p>
          <p>
            Guests: {values.guests} | Bedrooms: {values.bedrooms} | Bathrooms: {values.bathrooms}
          </p>
          <div className="space-y-1">
            <h2 className="font-semibold">Amenities:</h2>
            <ul className="list-disc list-inside">
              {Array.from(values.amenities.entries()).map(
                ([amenity, available]) => available && <li key={amenity}>{amenity}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Edit</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          Publish
        </button>
      </div>
    </div>
  )
}

const Step: FC<StepProps> = ({ locale, setStep, setValues, values, setEnableNext }) => {
  const { cabinPrice, hotelPrice, currency: originalCurrency, propertyType } = values

  return (
    <div>
      {/* Other step related content */}
      <PropertyPreview values={values} />
    </div>
  )
}

export default Step

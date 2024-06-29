import React, { FC } from 'react'

type Props = {
  values: any
}

const Step: FC<Props> = ({ values }) => {
  const amenitiesMap: any = {
    ac: 'Air Conditioning',
    bedSheets: 'Bed Sheets',
    coffeeMachine: 'Coffee Machine',
    extraBed: 'Extra Bed',
    freeParking: 'Free Parking',
    garden: 'Garden',
    hotWater: 'Hot Water',
    kitchen: 'Kitchen',
    laundry: 'Laundry',
    oven: 'Oven',
    petFriendly: 'Pet Friendly',
    pool: 'Pool',
    refrigerator: 'Refrigerator',
    smoking: 'Smoking',
    towels: 'Towels',
    tv: 'TV',
    wifi: 'WiFi'
  }

  return (
    <div className="mx-auto p-6 bg-white w-full flex flex-col">
      <div className="w-full m-auto">
        <h1 className="text-2xl font-semibold mb-2 text-center">{values.propertyName}</h1>
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Property Image */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-2 lg:ml-64">
            <img
              src={values.tmpImages[0].base64}
              alt={values.propertyName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Property Details */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 lg:mr-2">
            <p className="text-lg font-semibold">
              Price: ${values.price} {values.currency} per night
            </p>
            <p className="mt-2">
              <b>Location:</b> <br />
              {values.address1} {values.address2} <br />
              {values.city}, {values.state}, {values.zipCode} <br />
              {values.country}
            </p>
            <p className="mt-2">
              Guests: {values.guests} | Bedrooms: {values.bedrooms} | Bathrooms: {values.bathrooms}{' '}
              | Beds: {values.beds}
            </p>
            <div className="mt-4">
              <h2 className="font-semibold">Amenities:</h2>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Array.from(values.amenities.entries()).map(
                  ([amenity, available]: any) =>
                    available && (
                      <div key={amenity} className="flex items-center">
                        {amenitiesMap[amenity]}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step

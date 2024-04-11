'use client'
import React, { FC, useState } from 'react'

import Counter from '~/components/Counter'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  values: any
  setValues: any
}

const Step: FC<Props> = ({ locale, values, setValues }) => {
  const { guests, bathrooms, beedrooms, beeds } = values
  const t = i18n(locale)
  const [personCount, setPersonCount] = useState(guests)
  const [roomCount, setRoomCount] = useState(0)
  const [bathroomCount, setBathroomCount] = useState(1)

  const onChange = (e: any) => {
    console.log(e.target.value)
    console.log(e.target.name)
  }

  /*   const renderRoomDropdown = (roomNumber: number) => {
    return (
      <div className="flex items-center mt-10 bg-slate-500 w-96 p-2 rounded-lg text-white">
        <label className="w-36 text-sm">{`Camas en Cuarto ${roomNumber}`}:</label>&nbsp;
        <div>
          <Counter
            label="King"
            onChange={(count: number) => {
              setSelectedBeds(selectedBeds.set(roomNumber, count))
            }}
            max={5}
            spaces={12}
            style={{ width: '139px', fontSize: '14px' }}
          />

          <Counter
            label="Queen"
            onChange={(count: number) => {
              setSelectedBeds(selectedBeds.set(roomNumber, count))
            }}
            max={5}
            spaces={9}
            style={{ width: '140px', fontSize: '14px' }}
          />

          <Counter
            label="Full"
            onChange={(count: number) => {
              setSelectedBeds(selectedBeds.set(roomNumber, count))
            }}
            max={5}
            spaces={14}
            style={{ width: '139px', fontSize: '14px' }}
          />
        </div>
      </div>
    )
  } */

  return (
    <div className="flex flex-col space-y-4 w-96">
      <div className="bg-white p-2 rounded-xl text-black">
        <div className="flex flex-row justify-between  items-center space-x-2 my-6">
          <p>Guests</p>

          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, guests: count })
            }}
            defaultValue={guests}
            max={25}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>
        <hr className="border-solid	" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Bathrooms</p>

          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, bathrooms: count })
            }}
            max={10}
            defaultValue={bathrooms}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>
        <hr className="border-solid	" />

        <div className="flex flex-row justify-between items-center space-x-2 my-6">
          <p>Beedrooms</p>
          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, beedrooms: count })
            }}
            defaultValue={beedrooms}
            max={6}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>

        <hr className="border-solid	" />

        <div className="flex flex-row justify-between  items-center space-x-2 my-6">
          <p>Beeds</p>
          <Counter
            label=""
            onChange={(count: number) => {
              setValues({ ...values, beeds: count })
            }}
            defaultValue={beeds}
            max={6}
            spaces={5}
            style={{ width: '120px' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Step

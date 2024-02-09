'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import Counter from '~components/Counter'

import { Translations } from '~app/i18n'

const Step: FC = ({ t }) => {
  const [personCount, setPersonCount] = useState(1)
  const [roomCount, setRoomCount] = useState(0)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [selectedBeds, setSelectedBeds] = useState(new Map())

  const renderRoomDropdown = (roomNumber: number) => {
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
  }

  return (
    <div className="flex flex-col space-y-4 w-96">
      <div className="bg-slate-700 p-2 rounded-xl text-white">
        <div className="flex flex-col items-center space-x-2">
          <Counter
            label="Capacidad"
            onChange={(count: number) => {
              setPersonCount(count)
            }}
            max={25}
            style={{ width: '165px' }}
          />
        </div>

        <div className="flex flex-col items-center space-x-2">
          <Counter
            label="Baños"
            onChange={(count: number) => {
              setBathroomCount(count)
            }}
            max={10}
            spaces={8}
            style={{ width: '165px' }}
          />
        </div>

        <div className="flex flex-col items-center space-x-2">
          <Counter
            label="Cuartos"
            onChange={(count: number) => {
              setRoomCount(count)
            }}
            max={6}
            spaces={5}
            style={{ width: '165px' }}
          />
        </div>
      </div>

      <div>{[...Array(roomCount)].map((_, index) => renderRoomDropdown(index + 1))}</div>
    </div>
  )
}

export default Step

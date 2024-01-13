'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import { Counter } from '@architecturex/components.counter'

import { Translations } from '~app/i18n'

interface Option {
  singular: string
  plural: string
}

interface TagData {
  option: Option
  count: number
}

interface TagProps {
  options: Option[]
}

const Tag: React.FC<TagProps> = ({ options }) => {
  const [availableOptions, setAvailableOptions] = useState<Option[]>([])
  const [selectedOptions, setSelectedOptions] = useState<TagData[]>([])

  useEffect(() => {
    setAvailableOptions(options)
  }, [options])

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionIndex = event.target.value
    const selectedOption = options[parseInt(selectedOptionIndex, 10)]
    setSelectedOptions((prevSelected) => [...prevSelected, { option: selectedOption, count: 1 }])
    setAvailableOptions((prevAvailable) =>
      prevAvailable.filter((_, index) => index.toString() !== selectedOptionIndex)
    )
  }

  const removeTag = (optionToRemove: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((option) => option.option !== optionToRemove)
    )
    setAvailableOptions((prevAvailable) => [...prevAvailable, optionToRemove])
  }

  const incrementCount = (optionToIncrement: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.map((option) =>
        option.option === optionToIncrement ? { ...option, count: option.count + 1 } : option
      )
    )
  }

  const decrementCount = (optionToDecrement: Option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.map((option) =>
        option.option === optionToDecrement && option.count > 1
          ? { ...option, count: option.count - 1 }
          : option
      )
    )
  }

  return (
    <div>
      {availableOptions.length > 0 && (
        <select
          onChange={handleSelect}
          className="border border-gray-300 rounded p-2 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value=""
        >
          <option value="" disabled>
            Select an option
          </option>
          {availableOptions.map((option, index) => (
            <option key={index} value={index}>
              {option.singular}
            </option>
          ))}
        </select>
      )}

      <div className="flex flex-wrap">
        {selectedOptions.map((option, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded flex items-center dark:bg-blue-900 dark:text-blue-200"
          >
            <button onClick={() => decrementCount(option.option)} className="ml-2">
              -
            </button>
            <span className="mx-1">{option.count}</span>
            <button onClick={() => incrementCount(option.option)} className="mr-2">
              +
            </button>

            {option.count > 1 ? option.option.plural : option.option.singular}

            <button
              onClick={() => removeTag(option.option)}
              className="ml-2 text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

const roomOptions: any[] = [
  {
    singular: 'Cama Individual',
    plural: 'Camas Individuales'
  },
  {
    singular: 'Cama Matrimonial',
    plural: 'Cama Matrimoniales'
  }
]

const Step: FC = ({ t }) => {
  const [personCount, setPersonCount] = useState(1)
  const [roomCount, setRoomCount] = useState(0)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [selectedBeds, setSelectedBeds] = useState(new Map())

  const renderRoomDropdown = (roomNumber: number) => {
    return (
      <div className="flex items-center mt-10">
        <label className="w-32">{`Cuarto ${roomNumber}`}:</label>&nbsp;
        <Tag options={roomOptions} />
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col items-center space-x-2">
        <Counter
          label="Personas"
          onChange={(count: number) => {
            setPersonCount(count)
          }}
          max={50}
          style={{ width: '160px' }}
        />
      </div>

      <div className="flex flex-col items-center space-x-2">
        <Counter
          label="Baños"
          onChange={(count: number) => {
            setBathroomCount(count)
          }}
          max={10}
          spaces={5}
          style={{ width: '160px' }}
        />
      </div>

      <div className="flex flex-col items-center space-x-2">
        <Counter
          label="Cuartos"
          onChange={(count: number) => {
            setRoomCount(count)
          }}
          max={10}
          spaces={2}
          style={{ width: '160px' }}
        />

        <div>{[...Array(roomCount)].map((_, index) => renderRoomDropdown(index + 1))}</div>
      </div>
    </div>
  )
}

export default Step

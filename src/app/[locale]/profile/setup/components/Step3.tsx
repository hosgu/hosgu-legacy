'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import { Select } from '@architecturex/components.select'
import { Checkbox } from '@architecturex/components.checkbox'

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

type Props = {
  label: string
  decrementClick?: () => void
  incrementClick?: () => void
}

const Counter: FC<Props> = ({ label, decrementClick, incrementClick }) => {
  const [count, setCount] = useState<number>(0)

  const increment = () => {
    if (count < 99) {
      if (incrementClick) {
        incrementClick()
      }

      setCount((prevCount) => prevCount + 1)
    }
  }

  const decrement = () => {
    if (count > 0) {
      if (decrementClick) {
        decrementClick()
      }

      setCount((prevCount) => prevCount - 1)
    }
  }

  return (
    <div className="custom-number-input h-10 w-[118px] flex items-center">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={decrement}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={count}
          readOnly
          style={{ paddingLeft: '10px' }}
        />
        <button
          data-action="increment"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={increment}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>

      <span className="ml-2">{label}</span>
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

const Step: FC<Props> = ({ t }) => {
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
        <Counter label="Cuartos" />
      </div>

      <div className="flex flex-col items-center space-x-2">
        <Counter label="Baños" />
      </div>
      <div className="flex flex-col items-center space-x-2">
        <Counter
          label="Cuartos"
          decrementClick={() => setRoomCount(Math.max(1, roomCount - 1))}
          incrementClick={() => setRoomCount(roomCount + 1)}
        />

        <div>{[...Array(roomCount)].map((_, index) => renderRoomDropdown(index + 1))}</div>
      </div>
    </div>
  )
}

export default Step

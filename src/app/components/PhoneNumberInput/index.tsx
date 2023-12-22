import React, { useState } from 'react'

type InputProps = {
  placeholder?: string
}

const InputComponent: React.FC<InputProps> = ({ placeholder }) => {
  const [areaCode, setAreaCode] = useState('+1')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = formatPhoneNumber(rawValue)
    setPhoneNumber(formattedValue)
  }

  const formatPhoneNumber = (value: string) => {
    if (!value) {
      return value
    }

    // Extract country code and digits
    const digits = value.replace(/\D/g, '')

    // Apply formatting
    if (digits.length <= 3) {
      return `${digits}`
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }

  return (
    <div className="p-4 text-left">
      <label
        className="block text-gray-700 text-sm font-bold text-left dark:text-gray-300"
        htmlFor="phoneInput"
      >
        Business phone
      </label>
      <div className="flex items-center space-x-2 p-2">
        <input
          type="text"
          placeholder="+1"
          value={areaCode}
          onChange={(e) => setAreaCode(e.target.value)}
          className="w-12 border p-2 -ml-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder={placeholder}
          value={phoneNumber}
          onChange={handleInputChange}
          className="w-[149px] border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  )
}

export default InputComponent

import React, { useState, useRef, ChangeEvent, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void
  placeholder?: string
  name?: string
  error?: boolean // Added error prop
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  options,
  onChange,
  onBlur,
  placeholder,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<string>('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSelect = (value: string, label: string) => {
    const event = {
      target: {
        name,
        value
      }
    }
    setSelectedLabel(label)

    onChange(event as unknown as ChangeEvent<HTMLSelectElement>)
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block w-full text-left mb-3" ref={dropdownRef}>
      <div
        className={`cursor-pointer border rounded-md p-2 flex justify-between items-center text-sm bg-white dark:bg-black ${
          error ? 'border-red-500 dark:border-red-500' : 'border-gray-200 dark:border-gray-600'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selectedLabel ? 'text-black dark:text-white' : 'text-gray-400'}`}>
          {selectedLabel || placeholder || 'Select...'}
        </span>
        <svg
          className="w-4 h-4 ml-2 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          ></path>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:border-gray-600 dark:bg-black">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className="p-2 hover:bg-gray-100 cursor-pointer text-black dark:hover:bg-gray-800 dark:text-white"
                onClick={() => {
                  if (onBlur) {
                    onBlur({ target: { name } } as unknown as ChangeEvent<HTMLSelectElement>)
                  }

                  handleSelect(option.value, option.label)
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CustomSelect

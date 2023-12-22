import React from 'react'

interface SelectProps {
  options: { value: string; label: string }[]
  placeholder?: string
  name?: string
}

const Select: React.FC<SelectProps> = ({ name, options, placeholder }) => {
  return (
    <div className="relative">
      <select
        className="h-12 w-full rounded-lg border border-transparent indent-4 shadow-lg focus:outline-none focus:ring focus:ring-pacific dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none"
        defaultValue=""
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.95 7.05a.75.75 0 01 1.06 0l3 3 3-3a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 010-1.06z" />
        </svg>
      </div>
    </div>
  )
}

export default Select

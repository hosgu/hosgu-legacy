'use client'
import { ne } from 'drizzle-orm'
import React, { FC, useState, useEffect } from 'react'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  values: any
  setValues: any
  enableNext: boolean
  setEnableNext: any
}

const Step: FC<Props> = ({ locale, setStep, setValues, values, setEnableNext }) => {
  const { cabinPrice, hotelPrice, currency: originalCurrency, propertyType } = values

  const [price, setPrice] = useState<number>(propertyType === 'cabin' ? cabinPrice : hotelPrice)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>(price.toString())
  const [error, setError] = useState<string | null>(null)
  const [currency, setCurrency] = useState<string>(originalCurrency)
  const t = i18n(locale)

  useEffect(() => {
    setInputValue(price.toString())
  }, [price])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (/^\d*$/.test(value)) {
      setInputValue(value)

      if (parseInt(value, 10) > 100000) {
        setError('Value cannot exceed 100,000')
      } else {
        setError(null)
      }
    }
  }

  const handleBlur = () => {
    const newValue = parseInt(inputValue, 10)
    if (!isNaN(newValue) && newValue <= 100000) {
      setPrice(newValue)
      setValues({
        ...values,
        [`${propertyType}Price`]: newValue
      })
    } else {
      setInputValue(price.toString()) // Reset to current price if invalid input
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD':
        return '$'
      case 'MXN':
        return 'MX$'
      default:
        return '$'
    }
  }

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value)
  }

  return (
    <div className="text-center mt-10">
      <div className="text-8xl font-bold flex justify-center items-center">
        <span className="mr-2">{getCurrencySymbol()}</span>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className={`text-8xl text-center border-none focus:ring-0 outline-none w-48 ${error ? 'text-red-500' : ''}`}
          />
        ) : (
          <span onClick={() => setIsEditing(true)} className={`${error ? 'text-red-500' : ''}`}>
            {formatNumber(price)}
          </span>
        )}
      </div>
      {error && <div className="text-red-500 text-xl mt-2">{error}</div>}

      <div className="mt-4">
        <label htmlFor="currency" className="mr-2">
          {t('profile.setup.step5.currency')}:
        </label>
        <select
          id="currency"
          value={currency}
          onChange={handleCurrencyChange}
          className="border p-1 rounded dark:text-black"
        >
          <option value="USD">USD</option>
          <option value="MXN">MXN</option>
        </select>
      </div>
    </div>
  )
}

export default Step

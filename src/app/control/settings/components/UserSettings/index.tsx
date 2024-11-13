'use client'
import React, { ChangeEvent, FC } from 'react'

import Button from '~/components/Button'
import useCustomState from '~/app/core/hooks/useCustomState'
import cx from '@architecturex/utils.cx'

import Input from '~/components/Input'

const UserSettings: FC = () => {
  const [values, setValues] = useCustomState({
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    taxesPercentage: 0,
    minimunBooking: 1,
    theme: 'light'
  })

  const [errors, setErrors] = useCustomState({
    currency: '',
    language: '',
    timezone: '',
    taxesPercentage: '',
    minimunBooking: '',
    theme: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="w-11/12 max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            autoComplete="new-password"
            name="language"
            label="Language"
            value={values.language}
            onChange={handleChange}
            required
            dropdownItems={['English', 'Spanish']}
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.language
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.language}
          </p>

          <Input
            autoComplete="new-password"
            name="timezone"
            label="Timezone"
            value={values.timezone}
            onChange={handleChange}
            required
            dropdownItems={['Los Angeles', 'New York', 'Mexico City']}
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.timezone
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.timezone}
          </p>
        </div>
        <div>
          <Input
            autoComplete="new-password"
            name="theme"
            label="Theme"
            value={values.theme}
            onChange={handleChange}
            dropdownItems={['Light', 'Dark']}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.theme
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.theme}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

export default UserSettings

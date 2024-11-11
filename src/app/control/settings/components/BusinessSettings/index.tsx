'use client'
import React, { ChangeEvent, FC } from 'react'

import Button from '~/components/Button'
import useCustomState from '~/app/core/hooks/useCustomState'
import cx from '@architecturex/utils.cx'

import Input from '~/components/Input'
import File from '~/components/File'
import FilesPreviewer from '~/components/FilesPreviewer'
import config from '~/config'

const BusinessSettings: FC = () => {
  const [values, setValues] = useCustomState({
    name: 'John Smith',
    email: 'email@example.com',
    website: '',
    facebook: '',
    instagram: '',
    googleMapsUrl: '',
    language: 'en',
    timezone: 'UTC',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    logo: '',
    photo: ''
  })

  const [errors, setErrors] = useCustomState({
    name: '',
    email: '',
    website: '',
    facebook: '',
    instagram: '',
    googleMapsUrl: '',
    language: '',
    timezone: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    logo: '',
    photo: ''
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
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.name
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">{errors.name}</p>

          <Input
            autoComplete="new-password"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.email
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.email}
          </p>

          <Input
            autoComplete="new-password"
            name="website"
            label="Website"
            value={values.website}
            onChange={handleChange}
            required
            dropdownItems={['Los Angeles', 'New York', 'Mexico City']}
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.website
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.website}
          </p>

          <Input
            autoComplete="new-password"
            name="facebook"
            label="Facebook"
            value={values.facebook}
            onChange={handleChange}
            required
            dropdownItems={['Los Angeles', 'New York', 'Mexico City']}
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.facebook
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.facebook}
          </p>

          <Input
            autoComplete="new-password"
            name="instagram"
            label="Instagram"
            value={values.instagram}
            onChange={handleChange}
            required
            dropdownItems={['Los Angeles', 'New York', 'Mexico City']}
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.instagram
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.instagram}
          </p>

          <Input
            autoComplete="new-password"
            name="googleMapsUrl"
            label="Google Maps"
            value={values.googleMapsUrl}
            onChange={handleChange}
            required
            dropdownItems={['Los Angeles', 'New York', 'Mexico City']}
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.googleMapsUrl
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.googleMapsUrl}
          </p>

          <Input
            autoComplete="new-password"
            name="timezone"
            label="Time Zone"
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
        </div>
        <div>
          <Input
            autoComplete="new-password"
            name="phone"
            label="Phone Number"
            value={values.phone}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.phone
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.phone}
          </p>

          <Input
            autoComplete="new-password"
            name="addressLine1"
            label="Address Line 1"
            value={values.addressLine1}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.addressLine1
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.addressLine1}
          </p>

          <Input
            autoComplete="new-password"
            name="addressLine2"
            label="Address Line 2"
            value={values.addressLine2}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.addressLine2
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.addressLine2}
          </p>

          <Input
            autoComplete="new-password"
            name="city"
            label="City"
            value={values.city}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.city
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">{errors.city}</p>

          <Input
            autoComplete="new-password"
            name="state"
            label="State"
            value={values.state}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.state
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.state}
          </p>

          <Input
            autoComplete="new-password"
            name="country"
            label="Country"
            value={values.country}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.country
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.country}
          </p>

          <Input
            autoComplete="new-password"
            name="zipCode"
            label="Zip Code"
            value={values.zipCode}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.zipCode
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">
            {errors.zipCode}
          </p>

          <Input
            autoComplete="new-password"
            name="logo"
            label="Logo"
            value={values.logo}
            onChange={handleChange}
            required
            className={cx.join({
              'border-red-500 dark:border-red-500': errors.logo
            })}
          />
          <p className="text-red-500 mb-2 text-xxs ml-1 break-words max-w-[300px]">{errors.logo}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

export default BusinessSettings

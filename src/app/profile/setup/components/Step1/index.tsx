import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import cx from '@architecturex/utils.cx'
import { getCitiesByState, getStates } from '@architecturex/constants'

import Input from '~/components/Input'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  values: any
  errors: any
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  setValues: any
  validate: any
}

const Step: FC<Props> = ({ locale, values, setValues, handleChange, validate, errors }) => {
  const t = i18n(locale)
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    if (values.state) {
      const newCities = getCitiesByState(values.country, values.state)
      setCities(newCities)
    }
  }, [values.state, values.country])

  const handleStateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e)
    const newCities = getCitiesByState(values.country, e.target.value)
    setCities(newCities)
    setValues('city', '') // Reset city when state changes
  }

  const states = getStates(values.country)

  return (
    <div className="mx-auto p-6 lg:w-[600px] flex flex-col md:flex-row md:flex-wrap bg-white dark:bg-gray-900 w-full">
      <div className="w-full md:w-1/2 md:pr-4">
        <Input
          label={t('common.user.email')}
          value={values.email}
          disabled
          required
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <Input
          autoComplete="new-password"
          name="password"
          type="password"
          label={t('common.input.password')}
          value={values.password}
          onChange={handleChange}
          onBlur={validate}
          required
          className={errors.password ? 'border-red-500 dark:border-red-500' : ''}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">
          {errors.password}
        </p>

        <Input
          autoComplete="new-password"
          name="propertyName"
          label={t('common.property.name')}
          value={values.propertyName}
          onChange={handleChange}
          onBlur={validate}
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.propertyName
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">
          {errors.propertyName}
        </p>

        <Input
          autoComplete="new-password"
          name="googleMaps"
          label="Google Maps"
          value={values.googleMaps}
          onChange={handleChange}
          placeholder="https://www.google.com/maps/place/..."
          onBlur={validate}
          required
          className={errors.zipCode ? 'border-red-500 dark:border-red-500' : ''}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
          {errors.googleMaps}
        </p>
      </div>

      <div className="w-full md:w-1/2 md:pl-4">
        <Input
          name="country"
          label={t('common.general.country')}
          value={values.country}
          onChange={handleChange}
          disabled
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.country
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <Input
          autoComplete="new-password"
          name="state"
          label={t('common.general.state')}
          value={values.state}
          onChange={handleStateChange}
          onBlur={validate}
          required
          dropdownItems={states.map((state: any) => state.state)} // Extract the state names for the dropdown
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.state
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">{errors.state}</p>

        <Input
          autoComplete="new-password"
          name="city"
          label={t('common.general.city')}
          value={values.city}
          onChange={handleChange}
          onBlur={validate}
          required
          dropdownItems={cities} // Populate cities based on selected state
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.city
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">{errors.city}</p>

        <Input
          autoComplete="new-password"
          name="address1"
          label={t('common.business.address')}
          value={values.address1}
          onChange={handleChange}
          onBlur={validate}
          placeholder={t('profile.setup.step1.streetAddress')}
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.address1
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <Input
          autoComplete="new-password"
          name="address2"
          value={values.address2}
          onChange={handleChange}
          onBlur={validate}
          placeholder={t('profile.setup.step1.placeholder')}
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.address1
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
          {errors.address1}
        </p>

        <Input
          autoComplete="new-password"
          name="zipCode"
          label={t('common.business.zipCode')}
          value={values.zipCode}
          onChange={handleChange}
          onBlur={validate}
          required
          className={cx.join({
            'border-red-500 dark:border-red-500': errors.zipCode
          })}
          style={{ width: '100%', marginBottom: '2px' }}
        />

        <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
          {errors.zipCode}
        </p>
      </div>
    </div>
  )
}

export default Step

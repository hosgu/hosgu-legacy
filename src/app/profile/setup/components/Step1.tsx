'use client'
import React, { FC, ChangeEvent } from 'react'
import cx from '@architecturex/utils.cx'

import Input from '~/components/Input'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  values: any
  errors: any
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  validate: any
}
const Step: FC<Props> = ({ locale, values, handleChange, validate, errors }) => {
  const t = i18n(locale)

  return (
    <>
      <Input
        label={t('common.user.email')}
        value={values.email}
        disabled
        required
        style={{ width: '300px' }}
      />

      <div className="flex flex-col justify-center">
        <Input
          name="password"
          type="password"
          label={t('common.input.password')}
          value={values.password}
          onChange={handleChange}
          onBlur={() => validate('password')}
          required
          className={errors.password ? 'border-red-500 dark:border-red-500' : ''}
          style={{ width: '300px' }}
        />

        <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">
          {errors.password}
        </p>
      </div>

      <h2 className="p-0 text-lg font-bold mb-2 text-gray-800 dark:text-gray-300">
        {t('profile.setup.step1.propertyLocation')}
      </h2>

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
        style={{ width: '300px', marginBottom: '2px' }}
      />

      <Input
        name="state"
        label={t('common.general.state')}
        value={values.state}
        onChange={handleChange}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.state
        })}
        style={{ width: '300px', marginBottom: '2px' }}
      />

      <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">{errors.state}</p>

      <Input
        name="city"
        label={t('common.general.city')}
        value={values.city}
        onChange={handleChange}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.city
        })}
        style={{ width: '300px', marginBottom: '2px' }}
      />

      <p className="text-red-500 mb-4 text-xxs ml-1 break-words max-w-[300px]">{errors.city}</p>

      <Input
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
        style={{ width: '300px', marginBottom: '2px' }}
      />

      <Input
        name="address2"
        value={values.address2}
        onChange={handleChange}
        onBlur={validate}
        placeholder={t('profile.setup.step1.placeholder')}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.address1
        })}
        style={{ width: '300px', marginBottom: '2px' }}
      />

      <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">{errors.address1}</p>

      <Input
        name="zipCode"
        label={t('common.business.zipCode')}
        value={values.zipCode}
        onChange={handleChange}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.zipCode
        })}
        style={{ width: '300px', marginBottom: '2px' }}
      />

      <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">{errors.zipCode}</p>

      <Input
        name="googleMaps"
        label="Google Maps"
        value={values.googleMaps}
        onChange={handleChange}
        onBlur={validate}
        required
        className={errors.zipCode ? 'border-red-500 dark:border-red-500' : ''}
      />

      <p className="text-red-500 mb-3 text-xxs ml-1 break-words max-w-[300px]">
        {errors.googleMaps}
      </p>
    </>
  )
}

export default Step

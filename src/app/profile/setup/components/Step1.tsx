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
          onBlur={validate}
          required
          className={errors.password ? 'border-red-500 dark:border-red-500' : ''}
          style={{ width: '300px' }}
        />

        <p className="text-red-500 mb-4 text-xs ml-4 break-words max-w-[300px]">
          {errors.password}
        </p>
      </div>

      <h2 className="p-0 text-lg font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
        {t('profile.setup.step1.propertyLocation')}
      </h2>

      <Input
        label={t('common.general.country')}
        value={values.country}
        onChange={handleChange}
        onBlur={validate}
        disabled
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.country,
          'mb-1': true
        })}
        style={{ width: '300px' }}
      />

      <Input
        label={t('common.general.state')}
        value={values.state}
        onChange={handleChange}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.state,
          'mb-1': true
        })}
        style={{ width: '300px' }}
      />

      <Input
        label={t('common.general.city')}
        value={values.city}
        onChange={handleChange}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.city,
          'mb-1': true
        })}
        style={{ width: '300px' }}
      />

      <Input
        label={t('common.business.address')}
        value={values.address1}
        onChange={handleChange}
        placeholder={t('profile.setup.step1.streetAddress')}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.address1,
          'mb-1': true
        })}
        style={{ width: '300px' }}
      />

      <Input
        value={values.address2}
        onChange={handleChange}
        placeholder={t('profile.setup.step1.placeholder')}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.address2,
          'mb-1': true
        })}
        style={{ width: '300px' }}
      />

      <Input
        label={t('common.business.zipCode')}
        value={values.zipCode}
        onChange={handleChange}
        onBlur={validate}
        required
        className={cx.join({
          'border-red-500 dark:border-red-500': errors.zipCode,
          'mb-1': true
        })}
        style={{ width: '300px' }}
      />

      <Input
        label="Google Maps"
        value={values.zipCode}
        onChange={handleChange}
        onBlur={validate}
        required
        className={errors.zipCode ? 'border-red-500 dark:border-red-500' : ''}
        style={{ width: '300px' }}
      />
    </>
  )
}

export default Step

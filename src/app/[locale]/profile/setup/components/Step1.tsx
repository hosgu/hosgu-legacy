'use client'
import React, { FC, ChangeEvent } from 'react'
import { Input } from '@architecturex/components.input'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
  values: any
  errors: any
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  validate: () => boolean
}

const Step: FC<Props> = ({ t, values, handleChange, validate, errors }) => (
  <>
    <Input label={t.email} value={values.email} disabled required style={{ width: '300px' }} />
    <Input
      name="password"
      type="password"
      label={t.password}
      value={values.password}
      onChange={handleChange}
      onBlur={validate}
      required
      className={errors.password ? 'border-red-500 dark:border-red-500' : ''}
      style={{ width: '300px' }}
    />

    <p className="text-red-500 mb-4 text-xs">{errors.password}</p>
  </>
)

export default Step

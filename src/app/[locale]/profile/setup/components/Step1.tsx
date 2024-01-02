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
    <Input fullWidth label={t.email} value={values.email} disabled required />

    <select
      name="propertyType"
      value={values.propertyType}
      onChange={handleChange}
      onBlur={validate}
      required
      className={errors.propertyType ? 'border-red-500 dark:border-red-500' : ''}
    >
      <option value="cabin">Cabin</option>
      <option value="hotel">Hotel</option>
    </select>

    <p className="text-red-500 mb-4 text-xs">{errors.propertyType}</p>
  </>
)

export default Step

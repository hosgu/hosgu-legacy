'use client'
import React, { FC, ChangeEvent } from 'react'
import Input from '~/components/Input'

type Props = {
  t: Translations
  values: any
  errors: any
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  validate: any
}

const Step: FC<Props> = ({ t, values, handleChange, validate, errors }) => (
  <>
    <Input label={t.email} value={values.email} disabled required style={{ width: '300px' }} />

    <div className="flex flex-col justify-center">
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

      <p className="text-red-500 mb-4 text-xs ml-4 break-words max-w-[300px]">{errors.password}</p>
    </div>
  </>
)

export default Step

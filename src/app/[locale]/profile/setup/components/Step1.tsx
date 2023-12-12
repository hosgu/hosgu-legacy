'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import { Input } from '@architecturex/components.input'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
  email: string
  fullName: string
  countryCode: string
  phoneNumber: string
  errors: {
    fullName?: string
    phoneNumber?: string
  }
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  validate: () => boolean
}

const Step: FC<Props> = ({
  t,
  email,
  fullName,
  countryCode,
  phoneNumber,
  handleChange,
  validate,
  errors
}) => (
  <>
    <Input
      name="fullName"
      label={t.fullName}
      value={fullName}
      onChange={handleChange}
      onBlur={validate}
      required
      className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
    />

    <p className="text-red-500 mb-4 text-xs">{errors.fullName}</p>

    <Input label={t.email} value={email} disabled required />

    <Input
      label={t.phoneNumber}
      type="phone"
      name="phoneNumber"
      value={phoneNumber}
      countryCodes={{ '+1': 'USA', '+52': 'Mexico' }}
      countryCodeValue={countryCode}
      onCountryCodeChange={handleChange}
      onChange={handleChange}
      onBlur={validate}
      required
      placeholder="123-456-7890"
      maxLength={12}
      className={errors.phoneNumber ? 'border-red-500 dark:border-red-500' : ''}
    />

    <p className="text-red-500 mb-4 text-xs">{errors.phoneNumber}</p>
  </>
)

export default Step

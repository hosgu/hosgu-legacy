'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import { Input } from '@architecturex/components.input'

import Select from '~/app/components/Select'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
  propertyName: string
  propertyAddress1: string
  propertyAddress2: string
  propertyCity: string
  propertyState: string
  propertyZipCode: string
  errors: {
    propertyName?: string
    propertyAddress1?: string
    propertyAddress2?: string
    propertyCity?: string
    propertyState?: string
    propertyZipCode?: string
  }
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  validate: any
  values: any
  isCabin?: boolean
}

const Step: FC<Props> = ({
  t,
  propertyAddress1,
  propertyAddress2,
  propertyCity,
  propertyName,
  propertyState,
  propertyZipCode,
  errors,
  handleChange,
  validate,
  isCabin
}) => (
  <>
    <Input
      name="propertyName"
      label={isCabin ? t.cabinName : t.hotelName}
      value={propertyName}
      onChange={handleChange}
      onBlur={validate}
      required
      className={errors.propertyName ? 'border-red-500 dark:border-red-500' : ''}
    />

    <p className="text-red-500 mb-4 text-xs">{errors.propertyName}</p>

    <Input
      name="propertyAddress1"
      label={t.propertyAddress}
      value={propertyAddress1}
      placeholder={t.propertyAddress1Placeholder}
      onChange={handleChange}
      onBlur={validate}
      required
      className={errors.propertyAddress1 ? 'border-red-500 dark:border-red-500' : ''}
    />

    <Input
      name="propertyAddress2"
      value={propertyAddress2}
      placeholder={t.propertyAddress2Placeholder}
      onChange={handleChange}
      required
      className={errors.propertyAddress2 ? 'border-red-500 dark:border-red-500' : ''}
    />

    <Input
      name="propertyCity"
      value={propertyCity}
      onChange={handleChange}
      onBlur={validate}
      placeholder={t.city}
      required
      className={errors.propertyCity ? 'border-red-500 dark:border-red-500' : ''}
    />

    <Input
      name="propertyState"
      value={propertyState}
      placeholder={t.state}
      onBlur={validate}
      onChange={handleChange}
      required
      className={errors.propertyState ? 'border-red-500 dark:border-red-500' : ''}
    />

    <Input
      name="propertyZipCode"
      value={propertyZipCode}
      placeholder={t.postalCode}
      onBlur={validate}
      onChange={handleChange}
      required
      className={errors.propertyZipCode ? 'border-red-500 dark:border-red-500' : ''}
    />
  </>
)

export default Step

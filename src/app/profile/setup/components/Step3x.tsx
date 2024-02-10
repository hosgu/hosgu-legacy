'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import Input from '~/components/Input'

import Select from '~/components/Select'

type Props = {
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

    <Input name="googleMaps" value="" placeholder="Google Maps" onChange={handleChange} />

    <Input
      name="facebook"
      label="Social Media"
      value=""
      placeholder="Facebook"
      onChange={handleChange}
    />

    <Input name="instagram" value="" placeholder="Instagram" onChange={handleChange} />
    <Input name="youtube" value="" placeholder="Youtube" onChange={handleChange} />
  </>
)

export default Step

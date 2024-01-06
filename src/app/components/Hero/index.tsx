'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import { Input } from '@architecturex/components.input'
import { Button } from '@architecturex/components.button'
import { RenderIf } from '@architecturex/components.renderif'
import { Select } from '@architecturex/components.select'
import { Radio } from '@architecturex/components.radio'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'

import { Translations } from '~app/i18n'
import { initialSignupAction } from '../../actions/signup'

type Props = {
  t: Translations
}

const Hero: FC<Props> = ({ t }) => {
  const [isRegistered, setIsRegistered] = useState(false)

  const [values, setValues] = useState({
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  })

  const [errors, setErrors] = useState({
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'businessPhone') {
      if (newValue.length > 16) {
        return false
      }
    }

    return setValues({ ...values, [name]: newValue })
  }

  const handleSubmit = async () => {
    let fullName = ''
    let businessName = ''
    let businessEmail = ''
    let businessPhone = ''
    let businessWebsite = ''
    let country = ''

    if (!values.fullName) {
      fullName = t.required
    }

    if (!values.businessName) {
      businessName = t.required
    }

    if (!is(values.businessEmail).email()) {
      businessEmail = t.invalidEmail
    }

    if (!is(values.businessPhone).phone()) {
      businessPhone = t.invalidPhone
    }

    if (!is(values.businessWebsite).url()) {
      businessWebsite = t.invalidUrl
    }

    if (!values.country) {
      country = t.required
    }

    const formData = core.formData.set(new FormData(), values)

    const response = await initialSignupAction(formData)

    if (!response.ok && response.error?.code === 'EMAIL_ALREADY_EXISTS') {
      businessEmail = t[response.error.message as keyof typeof t]
    } else if (response.ok) {
      setIsRegistered(true)
    }

    setErrors({
      fullName,
      businessName,
      businessEmail,
      businessPhone,
      businessWebsite,
      country
    })
  }

  const SuccessMessage = () => (
    <div className="flex min-h-[519px] flex-col text-black dark:text-white justify-center m-auto p-1">
      <h2 className="text-black dark:text-white">{t.justOneMoreStep}</h2>
      <p className="w-11/12" style={{ margin: '0 auto' }}>
        {t.thankYouForRegistering}
      </p>
    </div>
  )

  const form = [
    <div key="row-1" className="flex">
      <Input
        id="fullName"
        label={t.fullName}
        name="fullName"
        placeholder={t.fullName}
        errorText={errors.fullName}
        onChange={handleChange}
        value={values.fullName}
      />
      <Input
        label={t.businessName}
        name="businessName"
        placeholder={t.businessName}
        errorText={errors.businessName}
        onChange={handleChange}
        value={values.businessName}
      />
    </div>,
    <div key="row-2" className="flex">
      <Input
        label={t.businessEmail}
        name="businessEmail"
        placeholder={t.businessEmail}
        errorText={errors.businessEmail}
        onChange={handleChange}
        value={values.businessEmail}
      />
      <Input
        label={t.businessPhone}
        name="businessPhone"
        placeholder={t.businessPhonePlaceholder}
        errorText={errors.businessPhone}
        onChange={handleChange}
        value={values.businessPhone}
      />
    </div>,
    <div key="row-3" className="flex">
      <Input
        label={t.businessWebsite}
        name="businessWebsite"
        placeholder="https://"
        errorText={errors.businessWebsite}
        onChange={handleChange}
        value={values.businessWebsite}
      />

      <Select
        label="Country"
        searchable
        style={{
          marginTop: '15px',
          marginLeft: '20px',
          marginRight: '20px',
          width: '195px'
        }}
        options={[
          {
            label: 'México',
            value: 'Mexico',
            selected: false
          },
          {
            label: 'United States',
            value: 'United States',
            selected: false
          }
        ]}
      />
    </div>
  ]

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  return (
    <div
      className="max-w-xLarge m-auto relative h-[900px] lg:h-screen px-8 text-center bg-cover bg-center bg-no-repeat bg-white dark:bg-gray-300"
      style={{ backgroundImage: `url('/images/waves.png')` }}
    >
      <div className="flex justify-between items-center flex-col xl:flex-row pt-5 lg:pt-60">
        <div className="relative z-10 align-center">
          <h1>{t.boostYourBusiness}</h1>
          <p className="pr-6 pb-4">{t.elevateYourBookings}</p>
        </div>

        <div className="border-gray-300 shadow-xl rounded bg-white dark:bg-gray-800 w-[400px] md:w-[480px] xl:w-[800px] pt-6">
          <RenderIf isTrue={isRegistered}>
            <SuccessMessage />
          </RenderIf>

          <RenderIf isFalse={isRegistered}>
            {form}

            <Radio
              checked={isChecked}
              onChange={handleCheckboxChange}
              label="Check me"
              helpText="Check me"
            />

            <div className="flex justify-center mb-6 mt-6">
              <Button
                color="secondary"
                shape="rounded"
                onClick={handleSubmit}
                style={{ width: '92%' }}
              >
                {t.getStarted}
              </Button>
            </div>

            <div
              className="flex justify-center mb-6 text-center dark:text-white p-2"
              style={{ fontSize: '10px' }}
            >
              {t.weAreCommitted}
            </div>
          </RenderIf>
        </div>
      </div>
    </div>
  )
}

export default Hero

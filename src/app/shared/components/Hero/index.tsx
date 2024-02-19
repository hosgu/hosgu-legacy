'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import { RenderIf } from '@architecturex/components.renderif'
import { Select } from '@architecturex/components.select'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import i18n from '~/app/shared/contexts/server/I18nContext'
import Input from '~/components/Input'
import Button from '~/components/Button'

import { initialSignupAction } from '~/app/shared/actions/signup'

type HeroData = {
  fullName: string
  businessName: string
  businessEmail: string
  businessPhone: string
  businessWebsite: string
  country: string
}
type Props = {
  action?: 'save' | 'edit'
  data?: HeroData
  locale?: string
}

const Hero: FC<Props> = ({ data = {}, action = 'save', locale = 'en-us' }) => {
  const t = i18n(locale)
  const initialValues: HeroData = {
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  }
  const [isRegistered, setIsRegistered] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')

  const [errors, setErrors] = useState({
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  })

  const validations = {
    fullName: (value: string) => {
      if (!value) {
        return t('required')
      }
      if (value.length < 2) {
        return t('required')
      }

      return ''
    },
    businessName: (value: string) => {
      if (!value) {
        return t('required')
      }
      if (value.length < 2) {
        return t('required')
      }

      return ''
    },
    businessEmail: (value: string) => {
      if (!value) {
        return t('required')
      }
      if (!is(value).email()) {
        return t('invalidEmail')
      }
      return ''
    },
    businessPhone: (value: string) => {
      if (!value) {
        return t('required')
      }
      if (!is(value).phone()) {
        return t('invalidPhone')
      }
      return ''
    },
    businessWebsite: (value: string) => {
      if (!value) {
        return t('required')
      }
      if (!is(value).url) {
        return t('invalidUrl')
      }
      return ''
    },
    country: () => {
      if (selectedCountry === '') {
        return t('required')
      }
      return ''
    }
  }

  const validate = (values: any) => {
    const newErrors = {
      ...errors,
      fullName: validations.fullName(values.fullName),
      businessName: validations.businessName(values.businessName),
      businessEmail: validations.businessEmail(values.businessEmail),
      businessPhone: validations.businessPhone(values.businessPhone),
      businessWebsite: validations.businessWebsite(values.businessWebsite),
      country: validations.country()
    }
    setErrors(newErrors)
    return (
      !newErrors.fullName &&
      !newErrors.businessEmail &&
      !newErrors.businessName &&
      !newErrors.businessPhone &&
      !newErrors.businessWebsite &&
      !newErrors.country
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('country', selectedCountry)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)
    if (isValidForm) {
      const response = await initialSignupAction(formData)
      if (!response.ok && response.error?.code === 'EMAIL_ALREADY_EXISTS') {
        initialValues.businessEmail = t(response.error.message as keyof typeof t)
      } else if (response.ok) {
        setIsRegistered(true)
      }
    }
  }

  const SuccessMessage = () => (
    <div className="flex min-h-[519px] flex-col text-black dark:text-white justify-center m-auto p-1">
      <h2 className="text-black dark:text-white">{t('justOneMoreStep')}</h2>
      <p className="w-11/12" style={{ margin: '0 auto' }}>
        {t('thankYouForRegistering')}
      </p>
    </div>
  )

  return (
    <div
      className="max-w-xLarge m-auto relative h-[900px] md:h-max lg:screen px-8 text-center bg-cover bg-center bg-no-repeat bg-white dark:bg-gray-300"
      style={{ backgroundImage: `url('/images/waves.png')` }}
    >
      <div className="flex justify-between items-center flex-col xl:flex-row pt-5 md:pt-30 pb-10">
        <div className="relative z-10 align-center">
          <h1>{t('boostYourBusiness')}</h1>
          <p className="pr-6 pb-4">{t('elevateYourBookings')}</p>
        </div>

        <div className="border-gray-300 shadow-xl rounded bg-white dark:bg-gray-800 w-[400px] md:w-[480px] xl:w-[800px] pt-6">
          <RenderIf isTrue={isRegistered}>
            <SuccessMessage />
          </RenderIf>

          <RenderIf isFalse={isRegistered}>
            <form onSubmit={handleSubmit}>
              <div key="row-1" className="flex">
                <Input
                  id="fullName"
                  label="Full name"
                  name="fullName"
                  className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
                  placeholder="fullName"
                  required
                  errorText={errors.fullName}
                />
                <Input
                  id="businessName"
                  label={t('businessName')}
                  name="businessName"
                  className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
                  placeholder={t('businessName')}
                  required
                  errorText={errors.businessName}
                />
              </div>
              <div key="row-2" className="flex">
                <Input
                  label={t('businessEmail')}
                  name="businessEmail"
                  className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
                  placeholder={t('businessEmail')}
                  required
                  errorText={errors.businessEmail}
                />
                <Input
                  label={t('businessPhone')}
                  name="businessPhone"
                  className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
                  placeholder={t('businessPhonePlaceholder')}
                  required
                  errorText={errors.businessPhone}
                />
              </div>
              <div key="row-3" className="flex">
                <Input
                  label={t('businessWebsite')}
                  name="businessWebsite"
                  className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
                  placeholder="https://"
                  required
                  errorText={errors.businessWebsite}
                />
                <div className={errors.country ? 'border-red-500 dark:border-red-500' : ''}>
                  <Select
                    label="Country"
                    searchable
                    onSelectionChange={(value) => {
                      setSelectedCountry(value)
                    }}
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
                  {errors.country && (
                    <p className="mx-5 text-red-500 text-xs text-left mb-4 block">
                      {' '}
                      {errors.country}{' '}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center mb-6 mt-6">
                <Button color="secondary" shape="rounded" type="submit" style={{ width: '92%' }}>
                  {t('getStarted')}
                </Button>
              </div>
            </form>
            <div
              className="flex justify-center mb-6 text-center dark:text-white p-2"
              style={{ fontSize: '10px' }}
            >
              {t('weAreCommitted')}
            </div>
          </RenderIf>
        </div>
      </div>
    </div>
  )
}

export default Hero

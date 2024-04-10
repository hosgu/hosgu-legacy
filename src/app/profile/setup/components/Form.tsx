'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import Button from '~/components/Button'
import security from '@architecturex/utils.security'
import core from '@architecturex/utils.core'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step5'

import i18n from '~/app/shared/contexts/server/I18nContext'
import StepIndicator from '~/app/shared/components/StepIndicator'
import * as ProfileActions from '~/app/shared/actions/profile'
import { UserFields } from '~/server/db/schemas/user'

type Props = {
  user: UserFields
  locale: string
}

const Form: FC<Props> = ({ locale = 'en-us', user }) => {
  const t = i18n(locale)
  const [isDisabled, setIsDisabled] = useState(false)
  const [step, setStep] = useState(1)
  const [values, setValues] = useState({
    userId: user.id || '',
    email: user.email || '',
    password: '',
    propertyName: '',
    propertyType: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const [errors, setErrors] = useState({
    password: '',
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const validations = {
    propertyName: (value: string) => {
      if (!value) {
        return t('pleaseEnterYourPropertyName')
      }

      if (value.length < 3) {
        return t('pleaseEnterAValidPropertyName')
      }

      return ''
    },
    propertyAddress1: (value: string) => {
      if (!value) {
        return t('pleaseEnterYourPropertyAddress')
      }

      if (value.length < 3) {
        return t('pleaseEnterAValidPropertyAddress')
      }

      return ''
    },
    propertyCity: (value: string) => {
      if (!value) {
        return t('pleaseEnterYourPropertyCity')
      }

      if (value.length < 3) {
        return t('pleaseEnterAValidPropertyCity')
      }

      return ''
    },
    propertyState: (value: string) => {
      if (!value) {
        return t('pleaseEnterYourPropertyState')
      }

      if (value.length < 3) {
        return t('pleaseEnterAValidPropertyState')
      }

      return ''
    },
    propertyZipCode: (value: string) => {
      if (!value) {
        return t('pleaseEnterYourPropertyPostalCode')
      }

      if (value.length < 3) {
        return t('pleaseEnterAValidPropertyPostalCode')
      }

      return ''
    }
  }

  const validate = () => {
    if (step === 1) {
      const passwordValidation = security.password.validation(values.password)

      if (passwordValidation.reasons?.includes('length')) {
        setErrors({
          ...errors,
          password: t('passwordLength')
        })
      } else if (passwordValidation.reasons?.includes('lowercase')) {
        setErrors({
          ...errors,
          password: t('passwordLowercase')
        })
      } else if (passwordValidation.reasons?.includes('uppercase')) {
        setErrors({
          ...errors,
          password: t('passwordUppercase')
        })

        return ''
      } else if (passwordValidation.reasons?.includes('digit')) {
        setErrors({
          ...errors,
          password: t('passwordDigit')
        })

        return ''
      } else if (passwordValidation.reasons?.includes('special')) {
        setErrors({
          ...errors,
          password: t('passwordSpecial')
        })

        return ''
      }

      return passwordValidation.isValid
    }

    if (step === 3) {
      const newErrors = {
        ...errors,
        address1: validations.propertyAddress1(values.address1),
        city: validations.propertyCity(values.city),
        state: validations.propertyState(values.state),
        zipCode: validations.propertyZipCode(values.zipCode)
      }

      setErrors(newErrors)

      return !newErrors.address1 && !newErrors.city && !newErrors.state && !newErrors.zipCode
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()
    if (isValidStep && step < 3) {
      setStep((prevState) => prevState + 1)
    }

    if (isValidStep && step === 3) {
      const formData = core.formData.set(new FormData(), values)

      const response = await ProfileActions.setupProfile(formData)

      if (response.status === 200) {
        setStep((prevState) => prevState + 1)
      }
    }
  }

  const steps = [
    '',
    <Step1
      key="step1"
      locale={locale}
      values={values}
      errors={errors}
      handleChange={handleChange}
      validate={validate}
    />,
    <Step2
      key="step2"
      locale={locale}
      setValues={setValues}
      setIsDisabled={setIsDisabled}
      setStep={setStep}
    />,
    <Step3 key="step3" locale={locale} />,
    <Step4 key="step4" />
  ]

  return (
    <div className="flex items-center justify-center w-[500px]">
      <div className="p-10 rounded-lg">
        {step > 1 && step < 4 && (
          <a
            href="#"
            className="text-gray-600 text-sm"
            onClick={() => {
              setIsDisabled(false)
              setStep((prevState) => prevState - 1)
            }}
          >
            ← {t('back')}
          </a>
        )}

        <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
          {step === 1 && t('letsStart')}
          {step === 2 && t('whatPropertyTypeAreYouListing')}
          {step === 3 &&
            `${t('informationAboutYour')} ${values.propertyType === 'cabin' ? t('cabin') : t('hotel')}`}
          {step === 4 && 'Negocio Registrado Exitosamente!'}
        </h2>

        {step < 4 && <StepIndicator totalSteps={3} currentStep={step} />}

        {steps[step]}

        {step !== 2 && step !== 4 && (
          <div className="flex items-center justify-center mt-8">
            <Button onClick={handleSubmit} disabled={isDisabled} shape="circle">
              {step === 3 ? t('save') : t('continue')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Form

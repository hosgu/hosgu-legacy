'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import security from '@architecturex/utils.security'
import core from '@architecturex/utils.core'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step5'

import i18n from '~/app/shared/contexts/server/I18nContext'
import StepIndicator from '~/app/shared/components/StepIndicator'
import { setupProfileServerAction } from '~/app/shared/actions/profile'
import { UserFields } from '~/server/db/schemas/user'

type Props = {
  user: UserFields
  locale: string
}

const Form: FC<Props> = ({ locale = 'en-us', user }) => {
  const t = i18n(locale)
  const [currentStep, setCurrentStep] = useState(0)
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

  const goBack = () => {
    setCurrentStep((prev: number) => (prev > 0 ? prev - 1 : 0))
  }

  const goNext = async () => {
    const result = await handleSubmit()

    if (result) {
      setCurrentStep((prev: number) => (prev < steps.length - 1 ? prev + 1 : prev))
    }
  }

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
    if (currentStep === 0) {
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

    if (currentStep === 3) {
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
    console.log('isValidStep', isValidStep, currentStep, values)
    if (isValidStep && currentStep < 3) {
      return true
    }

    if (isValidStep && currentStep === 2) {
      const formData = core.formData.set(new FormData(), values)

      const response = await setupProfileServerAction(formData)

      if (response.status === 200) {
        setCurrentStep((prevState) => prevState + 1)
      }
    }

    return false
  }

  const steps = [
    <Step1
      key="step1"
      locale={locale}
      values={values}
      errors={errors}
      handleChange={handleChange}
      validate={validate}
    />,
    <Step2 key="step2" locale={locale} setValues={setValues} setStep={setCurrentStep} />,
    <Step3 key="step3" locale={locale} />,
    <Step4 key="step4" />
  ]

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="p-10 rounded-lg">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
            {currentStep === 0 && t('letsStart')}
            {currentStep === 1 && t('whatPropertyTypeAreYouListing')}
            {currentStep === 2 &&
              `${t('informationAboutYour')} ${values.propertyType === 'cabin' ? t('cabin') : t('hotel')}`}
            {currentStep === 3 && 'Negocio Registrado Exitosamente!'}
          </h2>

          {steps[currentStep]}
        </div>
      </div>

      <div className="w-2/3 m-auto" style={{ border: '1px solid blue', marginTop: '300px' }}>
        <StepIndicator steps={4} currentStep={currentStep} onBack={goBack} onNext={goNext} />
      </div>
    </>
  )
}

export default Form

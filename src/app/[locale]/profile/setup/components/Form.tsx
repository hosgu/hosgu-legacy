'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import { Button } from '@architecturex/components.button'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

import StepIndicator from '~components/StepIndicator'
import { Translations } from '~app/i18n'
import { setupProfileServerAction } from '../actions'
import { UserFields } from '~/server/db/schemas/user'

type Props = {
  t: Translations
  user: UserFields
}

type Errors = {
  fullName?: string
  businessName?: string
  phoneNumber?: string
  propertyName?: string
  propertyAddress1?: string
  propertyAddress2?: string
  propertyCity?: string
  propertyState?: string
  propertyZipCode?: string
  propertyCountry?: string
  propertyWebsite?: string
}

const Form: FC<Props> = ({ t, user }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Errors>({
    fullName: '',
    phoneNumber: '',
    businessName: '',
    propertyName: '',
    propertyAddress1: '',
    propertyCity: '',
    propertyState: '',
    propertyZipCode: '',
    propertyCountry: '',
    propertyWebsite: ''
  })
  const [formData, setFormData] = useState({
    userId: user.id || '',
    fullName: '',
    email: user.email || '',
    countryCode: '+1',
    phoneNumber: '',
    propertyType: '',
    businessName: '',
    propertyName: '',
    propertyAddress1: '',
    propertyAddress2: '',
    propertyCity: '',
    propertyState: '',
    propertyZipCode: '',
    propertyCountry: '',
    propertyWebsite: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'countryCode') {
      setFormData((prevState) => ({ ...prevState, countryCode: value }))
    } else if (name === 'phoneNumber') {
      const cleanedNumber = value.replace(/\D/g, '')
      let newPhoneNumber = cleanedNumber

      if (cleanedNumber.length === 10) {
        const match = cleanedNumber.match(/^(\d{3})(\d{3})(\d{4})$/)

        if (match) {
          newPhoneNumber = `${match[1]}-${match[2]}-${match[3]}`
        }
      }

      if (newPhoneNumber.length > 12) {
        return
      }

      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: newPhoneNumber
      }))
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          [name]: value
        }
      })
    }
  }

  const validations = {
    fullName: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourFullName
      }

      if (value.length < 3) {
        return t.pleaseEnterAValidFullName
      }

      if (value.split(' ').length < 2) {
        return t.pleaseEnterYourFullName
      }

      return ''
    },
    businessName: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourBusinessName
      }

      return ''
    },
    propertyName: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPropertyName
      }

      if (value.length < 3) {
        return t.pleaseEnterAValidPropertyName
      }

      return ''
    },
    propertyAddress1: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPropertyAddress
      }

      if (value.length < 3) {
        return t.pleaseEnterAValidPropertyAddress
      }

      return ''
    },
    propertyCity: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPropertyCity
      }

      if (value.length < 3) {
        return t.pleaseEnterAValidPropertyCity
      }

      return ''
    },
    propertyState: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPropertyState
      }

      if (value.length < 3) {
        return t.pleaseEnterAValidPropertyState
      }

      return ''
    },
    propertyZipCode: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPropertyPostalCode
      }

      if (value.length < 3) {
        return t.pleaseEnterAValidPropertyPostalCode
      }

      return ''
    },
    propertyCountry: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPropertyCountry
      }

      return ''
    },
    phoneNumber: (value: string) => {
      if (!value) {
        return t.pleaseEnterYourPhoneNumber
      }

      if (value.length < 12) {
        return t.pleaseEnterAValidPhoneNumber
      }

      return ''
    }
  }

  const validate = () => {
    if (step === 1) {
      const newErrors = {
        fullName: validations.fullName(formData.fullName),
        phoneNumber: validations.phoneNumber(formData.phoneNumber)
      }

      setErrors(newErrors)

      return !newErrors.fullName && !newErrors.phoneNumber
    }

    if (step === 3) {
      const newErrors = {
        fullName: '',
        phoneNumber: '',
        businessName: validations.businessName(formData.businessName),
        propertyName: validations.propertyName(formData.propertyName),
        propertyAddress1: validations.propertyAddress1(formData.propertyAddress1),
        propertyCity: validations.propertyCity(formData.propertyCity),
        propertyState: validations.propertyState(formData.propertyState),
        propertyZipCode: validations.propertyZipCode(formData.propertyZipCode),
        propertyCountry: validations.propertyCountry(formData.propertyCountry)
      }

      setErrors(newErrors)

      return (
        !newErrors.businessName &&
        !newErrors.propertyName &&
        !newErrors.propertyAddress1 &&
        !newErrors.propertyCity &&
        !newErrors.propertyState &&
        !newErrors.propertyZipCode &&
        !newErrors.propertyCountry
      )
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()

    if (isValidStep && step < 3) {
      setStep((prevState) => prevState + 1)
    }

    if (isValidStep && step === 3) {
      const serverFormData = new FormData()

      serverFormData.append('userId', formData.userId)
      serverFormData.append('fullName', formData.fullName)
      serverFormData.append('email', formData.email)
      serverFormData.append('countryCode', formData.countryCode)
      serverFormData.append('phoneNumber', formData.phoneNumber)
      serverFormData.append('propertyType', formData.propertyType)
      serverFormData.append('businessName', formData.businessName)
      serverFormData.append('propertyName', formData.propertyName)
      serverFormData.append('propertyAddress1', formData.propertyAddress1)
      serverFormData.append('propertyAddress2', formData.propertyAddress2)
      serverFormData.append('propertyCity', formData.propertyCity)
      serverFormData.append('propertyState', formData.propertyState)
      serverFormData.append('propertyZipCode', formData.propertyZipCode)
      serverFormData.append('propertyCountry', formData.propertyCountry)
      serverFormData.append('propertyWebsite', formData.propertyWebsite)

      const response = await setupProfileServerAction(serverFormData)

      if (response.status === 200) {
        setStep((prevState) => prevState + 1)
      }
    }
  }

  const steps = [
    '',
    <Step1
      key="step1"
      t={t}
      email={user.email || ''}
      fullName={formData.fullName}
      countryCode={formData.countryCode}
      phoneNumber={formData.phoneNumber}
      errors={errors}
      handleChange={handleChange}
      validate={validate}
    />,
    <Step2
      key="step2"
      t={t}
      setFormData={setFormData}
      setIsClicked={setIsClicked}
      setStep={setStep}
    />,
    <Step3
      key="step3"
      t={t}
      isCabin={formData.propertyType === 'cabin'}
      businessName={formData.businessName}
      propertyName={formData.propertyName}
      propertyAddress1={formData.propertyAddress1}
      propertyAddress2={formData.propertyAddress2}
      propertyCity={formData.propertyCity}
      propertyState={formData.propertyState}
      propertyZipCode={formData.propertyZipCode}
      propertyCountry={formData.propertyCountry}
      propertyWebsite={formData.propertyWebsite}
      errors={errors}
      handleChange={handleChange}
      validate={validate}
    />,
    <Step4 key="step4" t={t} />
  ]

  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="p-6 rounded-lg">
          {step > 1 && step < 4 && (
            <a
              href="#"
              className="text-gray-600 text-sm"
              onClick={() => {
                setIsClicked(false)
                setStep((prevState) => prevState - 1)
              }}
            >
              ← {t.back}
            </a>
          )}

          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
            {step === 1 && t.letsStart}
            {step === 2 && t.whatPropertyTypeAreYouListing}
            {step === 3 &&
              `${t.informationAboutYour} ${formData.propertyType === 'cabin' ? t.cabin : t.hotel}`}
            {step === 4 && 'Negocio Registrado Exitosamente!'}
          </h2>

          {step < 4 && <StepIndicator totalSteps={3} currentStep={step} />}

          {steps[step]}

          {step !== 2 && step !== 4 && (
            <div className="flex items-center justify-center mt-8">
              <Button
                color="secondary"
                onClick={handleSubmit}
                disabled={isClicked}
                shape="circle"
                fullWidth
              >
                {step === 3 ? t.save : t.continue}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Form

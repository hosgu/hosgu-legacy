'use client'
import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import security from '@architecturex/utils.security'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import Notification from '~/components/Notification'
import fileUtils from '@architecturex/utils.files'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './FinalStep'

import i18n from '~/app/shared/contexts/server/I18nContext'
import StepIndicator from '~/app/shared/components/StepIndicator'
import * as ProfileActions from '~/app/shared/actions/profile'
import { UserFields } from '~/server/db/schemas/user'
import { RenderIf } from '@architecturex/components.renderif'

type Props = {
  user: UserFields & {
    businessSlug: string
  }
  locale: string
}

const Form: FC<Props> = ({ locale = 'en-us', user }) => {
  const t = i18n(locale)
  const [currentStep, setCurrentStep] = useState(0)
  const [values, setValues] = useState({
    userId: user?.id || '',
    email: user?.email || '',
    password: '',
    propertyName: '',
    propertyType: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    guests: 0,
    bathrooms: 0,
    beedrooms: 0,
    beeds: 0,
    priceNights: 0,
    cleaningFee: 0,
    extraPersonPrice: 0,
    checkIn: '',
    checkOut: '',
    images: [],
    amenities: new Map<string, boolean>([
      ['wifi', true],
      ['tv', false],
      ['kitchen', false],
      ['extraBed', false],
      ['refrigerator', false],
      ['bedSheets', false],
      ['freeParking', false],
      ['kitchenBasics', false],
      ['towels', false],
      ['pool', false],
      ['coffeeMachine', false],
      ['hotWater', false],
      ['oven', false],
      ['ac', false],
      ['garden', false],
      ['glassesPlates', false],
      ['laundry', false],
      ['petFriendly', false],
      ['smokin', false]
    ])
  })
  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  const [showNotification, setShowNotification] = useState(false)
  const [enableNext, setEnableNext] = useState(false)

  const [errors, setErrors] = useState({
    password: '',
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: '',
    priceNights: ''
  })

  const goBack = () => {
    setCurrentStep((prev: number) => (prev > 0 ? prev - 1 : 0))
  }

  const goNext = async () => {
    const result = await handleSubmit()
    setShowNotification(false)

    if (currentStep === 5) {
      if (uploadedFiles.length === 0) {
        setShowNotification(true)
        return
      }
      const uploadFilesResponse = await fileUtils.uploadFiles(
        uploadedFiles,
        `/api/v1/uploader?setType=image&businessSlug=${user.businessSlug}`
      )
      if (uploadFilesResponse.ok) {
        setValues({
          ...values,
          images: uploadFilesResponse.data.map((data: any) => data.path)
        })
      }
    }
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

  const verifyProperties = (
    value: string | number,
    minLength: number = 3,
    maxLength: number = 20,
    acceptNegative: boolean = false
  ) => {
    if (!value) return t(`pleaseEnterYourProperty${value}`)
    if (is(value).number()) {
      if (!acceptNegative && (value as number) < 0) return t(`pleaseAValidProperty${value}`)
    }

    if (is(value).string()) {
      if ((value as string).length < minLength || (value as string).length > maxLength) {
        return t(`pleaseAValidProperty${value}`)
      }
    }
    return ''
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
    },
    propertyPrice: (value: number) => {
      if (!value) {
        return t('pleaseEnterYourPrice')
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

    if (currentStep === 6) {
      const newErrors = {
        ...errors,
        address1: verifyProperties(values.address1, 0, 300),
        city: validations.propertyCity(values.city),
        state: validations.propertyState(values.state),
        zipCode: validations.propertyZipCode(values.zipCode),
        priceNights: validations.propertyPrice(values.priceNights)
      }

      setErrors(newErrors)

      return !newErrors.address1 && !newErrors.city && !newErrors.state && !newErrors.zipCode
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()
    console.log('isValidStep', isValidStep, currentStep, values)

    if (isValidStep && currentStep < 7) {
      return true
    }

    if (isValidStep && currentStep === 2) {
      const formData = core.formData.set(new FormData(), values)

      const response = await ProfileActions.setupProfile(formData)

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
    <Step3 key="step3" locale={locale} values={values} setValues={setValues} />,
    <Step4
      key="step4"
      locale={locale}
      setStep={setCurrentStep}
      values={values}
      setValues={setValues}
    />,
    <Step5
      key="step5"
      locale={locale}
      setStep={setCurrentStep}
      values={values}
      setValues={setValues}
    />,
    <Step6
      key="step6"
      locale={locale}
      setStep={setCurrentStep}
      values={values}
      setValues={setValues}
      setUploadedFiles={setUploadedFiles}
      uploadedFiles={uploadedFiles}
    />,
    <Step7 key="step6" />
  ]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    console.log(values.images)
  }, [values])

  return (
    <>
      <RenderIf isTrue={showNotification}>
        <Notification message="Error on saving profile data" type="error" />
      </RenderIf>

      <div className="flex justify-center w-full h-[75vh]">
        <div className="p-10 rounded-lg">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
            {currentStep === 0 && t('letsStart')}
            {currentStep === 1 && t('whatPropertyTypeAreYouListing')}
            {currentStep === 2 &&
              `${t('informationAboutYour')} ${values.propertyType === 'cabin' ? t('cabin') : t('hotel')}`}
            {currentStep === 3 && 'Tell guests what are the amenities!'}
            {currentStep === 4 && 'Set your prices'}
            {currentStep === 5 && 'Add some photos of your place'}
            {currentStep === 6 && 'Finish'}
          </h2>

          {steps[currentStep]}
        </div>
      </div>

      <div className="fixed bottom-4 left-0  w-full flex justify-center items-center">
        <div className="w-[90%]">
          <StepIndicator
            enableNext={enableNext}
            steps={6}
            currentStep={currentStep}
            onBack={goBack}
            onNext={goNext}
          />
        </div>
      </div>
    </>
  )
}

export default Form

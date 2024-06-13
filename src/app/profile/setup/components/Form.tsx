'use client'
import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import security from '@architecturex/utils.security'
import core from '@architecturex/utils.core'
import fileUtils from '@architecturex/utils.files'
import { RenderIf } from '@architecturex/components.renderif'

import { setupProfile } from '~/app/shared/actions/profile'
import Button from '~/components/Button'
import Notification from '~/components/Notification'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './FinalStep'

import i18n from '~/app/shared/contexts/server/I18nContext'
import StepIndicator from '~/app/shared/components/StepIndicator'
import * as ProfileActions from '~/app/shared/actions/profile'
import { UserFields } from '~/server/db/schemas/user'

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
    guests: 1,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cabinPrice: 150,
    hotelPrice: 50,
    currency: 'USD',
    checkIn: '',
    checkOut: '',
    images: [],
    amenities: new Map<string, boolean>([
      ['wifi', false],
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
      ['smoking', false]
    ])
  })
  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  const [showNotification, setShowNotification] = useState(false)
  const [enableNext, setEnableNext] = useState(true)

  const [errors, setErrors] = useState({
    password: '',
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: '',
    cabinPrice: '',
    hotelPrice: ''
  })

  const goBack = () => {
    setCurrentStep((prev: number) => (prev > 0 ? prev - 1 : 0))
  }

  const goNext = async () => {
    const result = await handleSubmit()
    setShowNotification(false)

    // upload photos
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

      let amenitiesValues: { i18n: string; name: string; exists: boolean }[] = []

      values.amenities.forEach((value: boolean, key: string) => {
        amenitiesValues.push({ i18n: key, name: key, exists: value })
      })

      let propertyData = { ...values, amenitiesValues }

      const formData = core.formData.set(new FormData(), {
        ...propertyData
      })

      await setupProfile(formData)
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
    propertyCabinPrice: (value: number) => {
      if (!value) {
        return t('pleaseEnterYourPrice')
      }

      return ''
    },
    propertyHotelPrice: (value: number) => {
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

    if (currentStep === 3) {
      const currentValues = Array.from(values.amenities.values())
      return currentValues.includes(true)
    }
    if (currentStep === 6) {
      const newErrors = {
        ...errors,
        address1: validations.propertyAddress1(values.address1),
        city: validations.propertyCity(values.city),
        state: validations.propertyState(values.state),
        zipCode: validations.propertyZipCode(values.zipCode),
        cabinPrice: validations.propertyCabinPrice(values.cabinPrice),
        hotelPrice: validations.propertyHotelPrice(values.hotelPrice)
      }

      setErrors(newErrors)

      return !newErrors.address1 && !newErrors.city && !newErrors.state && !newErrors.zipCode
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()

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
    <Step3
      key="step3"
      locale={locale}
      values={values}
      setValues={setValues}
      enableNext={enableNext}
      setEnableNext={setEnableNext}
    />,
    <Step4
      key="step4"
      locale={locale}
      setStep={setCurrentStep}
      values={values}
      setValues={setValues}
      setEnableNext={setEnableNext}
    />,
    <Step5
      key="step5"
      locale={locale}
      setStep={setCurrentStep}
      values={values}
      setValues={setValues}
      enableNext={enableNext}
      setEnableNext={setEnableNext}
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

      <div className="flex justify-center w-full h-[75vh] overflow-hidden">
        <div className="p-0 rounded-lg h-full overflow-hidden">
          <div className="inner-scroll-content">
            <h2 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
              {currentStep === 0 && t('letsStart')}
              {currentStep === 1 && t('whatPropertyTypeAreYouListing')}
              {currentStep === 2 &&
                `${t('informationAboutYour')} ${values.propertyType === 'cabin' ? t('cabin') : t('hotel')}`}
              {currentStep === 3 && 'Tell guests what are the amenities!'}
              {currentStep === 4 && 'Set your price'}
              {currentStep === 5 && 'Add some photos of your place'}
              {currentStep === 6 && 'Finish'}
            </h2>

            {steps[currentStep]}
          </div>
        </div>
      </div>

      <div className="sticky h-20 mt-12 bg-white dark:bg-gray-900 z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center h-full">
          <div className="flex w-full justify-between items-center">
            <Button color="dark" onClick={goBack} className="mr-4 h-12">
              Back
            </Button>

            <StepIndicator steps={7} currentStep={currentStep + 1} />

            <Button color="primary" onClick={goNext} disabled={!enableNext} className="h-12">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form

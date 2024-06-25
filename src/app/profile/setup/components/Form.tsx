'use client'
import React, { FC, ChangeEvent, useEffect } from 'react'
import security from '@architecturex/utils.security'
import core from '@architecturex/utils.core'
import fileUtils from '@architecturex/utils.files'
import { RenderIf } from '@architecturex/components.renderif'

import useCustomState from '~/app/shared/hooks/useCustomState'
import i18n from '~/app/shared/contexts/server/I18nContext'
import { setupProfile } from '~/app/shared/actions/profile'
import Button from '~/components/Button'
import Notification from '~/components/Notification'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import Step8 from './FinalStep'

import StepIndicator from '~/app/shared/components/StepIndicator'
import * as ProfileActions from '~/app/shared/actions/profile'
import { UserFields } from '~/server/db/schemas/user'
import e from 'express'

type Props = {
  user: UserFields & {
    businessSlug: string
  }
  locale: string
}

const Form: FC<Props> = ({ locale, user }) => {
  const t = i18n(locale)

  const [currentStep, setCurrentStep] = useCustomState(0)

  console.log(' Step:', currentStep)

  const [values, setValues] = useCustomState({
    amenities: new Map<string, boolean>([
      ['ac', false],
      ['bedSheets', false],
      ['coffeeMachine', false],
      ['extraBed', false],
      ['freeParking', false],
      ['garden', false],
      ['glassesPlates', false],
      ['hotWater', false],
      ['kitchen', false],
      ['kitchenBasics', false],
      ['laundry', false],
      ['oven', false],
      ['petFriendly', false],
      ['pool', false],
      ['refrigerator', false],
      ['smoking', false],
      ['towels', false],
      ['tv', false],
      ['wifi', false]
    ]),
    address1: '',
    address2: '',
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cabinPrice: 150,
    checkIn: '',
    checkInHour: '03',
    checkInMinute: '00',
    checkInPeriod: 'PM',
    checkOut: '',
    checkOutHour: '12',
    checkOutMinute: '00',
    checkOutPeriod: 'PM',
    city: '',
    // @ts-ignore
    country: user?.country || '',
    currency: 'USD',
    email: user?.email || '',
    googleMaps: '',
    guests: 1,
    hotelPrice: 50,
    images: [],
    password: '',
    propertyName: '',
    propertyType: '',
    state: '',
    tmpImages: [],
    userId: user?.id || '',
    zipCode: ''
  })
  console.log('VALUES===>', values)
  const [uploadedFiles, setUploadedFiles] = useCustomState<any>([])
  const [showNotification, setShowNotification] = useCustomState(false)
  const [enableNext, setEnableNext] = useCustomState(true)

  const [errors, setErrors] = useCustomState({
    address1: '',
    address2: '',
    businessEmail: '',
    businessName: '',
    businessPhone: '',
    businessWebsite: '',
    cabinPrice: '',
    city: '',
    country: '',
    fullName: '',
    googleMaps: '',
    hotelPrice: '',
    password: '',
    state: '',
    zipCode: ''
  })

  const goBack = () => {
    setCurrentStep((prev: number) => (prev > 0 ? prev - 1 : 0))
  }

  const goNext = async () => {
    const isValidStep = await handleSubmit()
    setShowNotification(false)

    // Store temporary images
    if (currentStep === 5) {
      setValues('tmpImages', uploadedFiles)
    }

    // upload photos
    if (currentStep === 6) {
      console.log(' Step:', currentStep)

      if (uploadedFiles.length === 0) {
        setShowNotification(true)
        return
      }

      const uploadFilesResponse = await fileUtils.uploadFiles(
        uploadedFiles,
        `/api/v1/uploader?setType=image&businessSlug=${user.businessSlug}`
      )

      if (uploadFilesResponse.ok) {
        setValues(
          'images',
          uploadFilesResponse.data.map((data: any) => data.path)
        )
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

    if (isValidStep) {
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
    propertyState: (value: string) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourPropertyState')
      }

      return ''
    },
    propertyCity: (value: string) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourPropertyCity')
      }

      if (value.length < 3) {
        return t('profile.setup.error.pleaseEnterAValidPropertyCity')
      }

      return ''
    },
    propertyAddress1: (value: string) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourPropertyAddress')
      }

      if (value.length < 3) {
        return t('profile.setup.error.pleaseEnterAValidPropertyAddress')
      }

      return ''
    },
    propertyZipCode: (value: string) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourPropertyPostalCode')
      }

      if (value.length < 3) {
        return t('profile.setup.error.pleaseEnterAValidPropertyPostalCode')
      }

      return ''
    },
    googleMaps: (value: string) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourGoogleMaps')
      }

      if (
        value.startsWith('https://www.google.com/maps') ||
        value.startsWith('https://maps.app.goo.gl')
      ) {
        return ''
      }

      return t('profile.setup.error.pleaseEnterAValidGoogleMaps')
    },
    propertyCabinPrice: (value: number) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourNightPrice')
      }

      return ''
    },
    propertyHotelPrice: (value: number) => {
      if (!value) {
        return t('profile.setup.error.pleaseEnterYourNightPrice')
      }

      return ''
    }
  }

  const validate = () => {
    if (currentStep === 0) {
      const passwordValidation = security.password.validation(values.password)

      if (passwordValidation.reasons?.includes('length')) {
        setErrors('password', t('profile.setup.validation.passwordLength'))
        return ''
      } else if (passwordValidation.reasons?.includes('lowercase')) {
        setErrors('password', t('profile.setup.validation.passwordLowercase'))
        return ''
      } else if (passwordValidation.reasons?.includes('uppercase')) {
        setErrors('password', t('profile.setup.validation.passwordUppercase'))
        return ''
      } else if (passwordValidation.reasons?.includes('digit')) {
        setErrors('password', t('profile.setup.validation.passwordDigit'))
        return ''
      } else if (passwordValidation.reasons?.includes('special')) {
        setErrors('password', t('profile.setup.validation.passwordSpecial'))
        return ''
      }

      setErrors('password', '')

      if (validations.propertyState(values.state)) {
        setErrors('state', validations.propertyState(values.state))
        return ''
      } else if (errors.state) {
        setErrors('state', '')
        return ''
      }

      if (validations.propertyCity(values.city)) {
        setErrors('city', validations.propertyCity(values.city))
        return ''
      } else if (errors.city) {
        setErrors('city', '')
        return ''
      }

      if (validations.propertyAddress1(values.address1)) {
        setErrors('address1', validations.propertyAddress1(values.address1))
        return ''
      } else if (errors.address1) {
        setErrors('address1', '')
        return ''
      }

      if (validations.propertyZipCode(values.zipCode)) {
        setErrors('zipCode', validations.propertyZipCode(values.zipCode))
        return ''
      } else if (errors.zipCode) {
        setErrors('zipCode', '')
        return ''
      }

      if (validations.googleMaps(values.googleMaps)) {
        setErrors('googleMaps', validations.googleMaps(values.googleMaps))
        return ''
      } else if (errors.googleMaps) {
        setErrors('googleMaps', '')
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

      setErrors('address1', newErrors.address1)
      setErrors('city', newErrors.city)
      setErrors('state', newErrors.state)
      setErrors('zipCode', newErrors.zipCode)
      setErrors('cabinPrice', newErrors.cabinPrice)
      setErrors('hotelPrice', newErrors.hotelPrice)

      return !newErrors.address1 && !newErrors.city && !newErrors.state && !newErrors.zipCode
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()

    if (isValidStep && currentStep < 8) {
      return true
    }

    /*if (isValidStep && currentStep === 2) {
      const formData = core.formData.set(new FormData(), values)

      const response = await ProfileActions.setupProfile(formData)

      if (response.status === 200) {
        setCurrentStep((prevState) => prevState + 1)
      }
    }*/

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
      setUploadedFiles={setUploadedFiles}
      uploadedFiles={uploadedFiles}
    />,
    <Step7 key="step6" values={values} setValues={setValues} locale={locale} />,
    <Step8 key="step8" />
  ]

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // useEffect(() => {
  //   console.log(values.images)
  // }, [values])

  useEffect(() => {
    if (uploadedFiles.size > 1) {
      setValues('images', uploadedFiles)
    }
  }, [uploadedFiles, values])

  return (
    <>
      <RenderIf isTrue={showNotification}>
        <Notification message="Error on saving profile data" type="error" />
      </RenderIf>

      <div className="flex justify-center w-full h-[78vh] overflow-hidden">
        <div className="p-0 rounded-lg h-full overflow-hidden">
          <div
            className="inner-scroll-content px-1"
            style={{ overflowY: currentStep === 0 ? 'hidden' : 'auto' }}
          >
            <h2 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
              {currentStep === 0 && t('profile.setup.step1.headline')}
              {currentStep === 1 && t('profile.setup.step2.headline')}
              {currentStep === 2 &&
                `${t('profile.setup.step3.headline')} ${values.propertyType === 'cabin' ? t('common.general.cabin') : t('common.general.hotel')}`}
              {currentStep === 3 && t('profile.setup.step4.headline')}
              {currentStep === 4 && t('profile.setup.step5.headline')}
              {currentStep === 5 && t('profile.setup.step6.headline')}
              {currentStep === 6 && t('profile.setup.step7.headline')}
            </h2>

            {steps[currentStep]}
          </div>
        </div>
      </div>

      <div className="sticky h-20 mt-7 bg-white dark:bg-gray-900 z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center h-full">
          <div className="flex w-full justify-between items-center">
            <Button color="dark" onClick={goBack} className="mr-4 h-12">
              {t('common.general.back')}
            </Button>

            <StepIndicator locale={locale} steps={8} currentStep={currentStep + 1} />

            <Button color="primary" onClick={goNext} disabled={!enableNext} className="h-12">
              {t('common.general.next')}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form

'use client'
import React, { FC, ChangeEvent, useEffect, useState } from 'react'
import cookies from '@architecturex/utils.cookies'
import security from '@architecturex/utils.security'
import core from '@architecturex/utils.core'
import cx from '@architecturex/utils.cx'
import fileUtils from '@architecturex/utils.files'
import { RenderIf } from '@architecturex/components.renderif'

import useCustomState from '~/app/core/hooks/useCustomState'
import i18n from '~/app/core/contexts/server/I18nContext'

import { setupProfile } from '~/app/core/actions/profile'
import * as UserActions from '~/app/core/actions/user'
import Button from '~/components/Button'
import Notification from '~/components/Notification'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import Step8 from './Step8'

import StepIndicator from '~/app/shared/components/StepIndicator'
import { UserFields } from '~/server/db/schemas/user'

import { generateRooms, floors, Floor, Room } from '~/app/core/utils/hotel'

type Props = {
  user: UserFields & {
    businessSlug: string
  }
  locale: string
}

const Form: FC<Props> = ({ locale, user }) => {
  const t = i18n(locale)

  const [currentStep, setCurrentStep] = useCustomState(0)

  const [values, setValues] = useCustomState({
    amenities: {
      ac: false,
      bedSheets: false,
      coffeeMachine: false,
      extraBed: false,
      freeParking: false,
      garden: false,
      glassesPlates: false,
      hotWater: false,
      kitchen: false,
      laundry: false,
      oven: false,
      petFriendly: false,
      pool: false,
      refrigerator: false,
      smoking: false,
      towels: false,
      tv: false,
      wifi: false
    },
    address1: '',
    address2: '',
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    // @ts-ignore
    businessId: user?.businessId || '',
    checkInHour: '03',
    checkInMinute: '00',
    checkInPeriod: 'PM',
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
    images: [],
    password: '',
    price: 150,
    propertyName: '',
    propertyType: '',
    state: '',
    tmpImages: [],
    userId: user?.id || '',
    zipCode: ''
  })

  const [parentFloors, setParentFloors] = useState<Floor[]>([
    { floor: 1, rooms: [{ count: 1, type: 'Single' }] }
  ])
  const [parentRooms, setParentRooms] = useState<Room[]>(generateRooms(floors))
  const [parentSkipFloor13, setParentSkipFloor13] = useState<boolean>(true)

  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  const [showNotification, setShowNotification] = useCustomState(false)
  const [enableNext, setEnableNext] = useCustomState(true)

  const [errors, setErrors] = useCustomState({
    address1: '',
    propertyName: '',
    city: '',
    googleMaps: '',
    password: '',
    state: '',
    zipCode: ''
  })

  const goBack = () => {
    setEnableNext(true)
    setCurrentStep((prev: number) => (prev > 0 ? prev - 1 : 0))
  }

  const validateBeforeGoNext = async () => {
    const validationErrors = validate()

    if (currentStep === 0 && validationErrors.length === 0) {
      return goNext()
    }

    if (currentStep > 0) {
      return goNext()
    }
  }

  const goNext = async () => {
    setShowNotification(false)

    // Store temporary images (5 = 6)
    if (currentStep === 5) {
      setValues('tmpImages', uploadedFiles)
    }

    // Upload photos (6 = 7)
    if (currentStep === 6) {
      if (uploadedFiles.length === 0) {
        setShowNotification(true)
        return
      }
    }

    const isValidStep = await handleSubmit()

    // Go to next step
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
      return !value ? t('profile.setup.error.pleaseEnterYourPropertyState') : ''
    },
    propertyName: (value: string) => {
      return !value ? t('profile.setup.error.pleaseEnterYourPropertyName') : ''
    },
    propertyCity: (value: string) => {
      if (value.length < 3) {
        return t('profile.setup.error.pleaseEnterAValidPropertyCity')
      }

      return !value ? t('profile.setup.error.pleaseEnterYourPropertyCity') : ''
    },
    propertyAddress1: (value: string) => {
      if (value.length < 3) {
        return t('profile.setup.error.pleaseEnterAValidPropertyAddress')
      }

      return !value ? t('profile.setup.error.pleaseEnterYourPropertyAddress') : ''
    },
    propertyZipCode: (value: string) => {
      const zipCodePattern = /^\d{5}$/

      if (!zipCodePattern.test(value)) {
        return t('profile.setup.error.pleaseEnterAValidPropertyPostalCode')
      }

      return !value ? t('profile.setup.error.pleaseEnterYourPropertyPostalCode') : ''
    },
    googleMaps: (value: string) => {
      if (
        value.startsWith('https://www.google.com/maps') ||
        value.startsWith('https://www.google.com.mx/maps') ||
        value.startsWith('https://google.com/maps') ||
        value.startsWith('https://google.com.mx/maps') ||
        value.startsWith('https://maps.app.goo.gl')
      ) {
        return ''
      }

      return !value
        ? t('profile.setup.error.pleaseEnterYourGoogleMaps')
        : t('profile.setup.error.pleaseEnterAValidGoogleMaps')
    },
    propertyPrice: (value: number) => {
      return !value ? t('profile.setup.error.pleaseEnterYourNightPrice') : ''
    }
  }

  const validate = () => {
    const tmpErrors: any = []

    if (currentStep === 0) {
      const passwordValidation = security.password.validation(values.password)

      if (passwordValidation.reasons?.includes('length')) {
        setErrors('password', t('profile.setup.validation.passwordLength'))
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('lowercase')) {
        setErrors('password', t('profile.setup.validation.passwordLowercase'))
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('uppercase')) {
        setErrors('password', t('profile.setup.validation.passwordUppercase'))
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('digit')) {
        setErrors('password', t('profile.setup.validation.passwordDigit'))
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('special')) {
        setErrors('password', t('profile.setup.validation.passwordSpecial'))
        tmpErrors.push('password')
        return tmpErrors
      }

      setErrors('password', '')

      if (validations.propertyName(values.propertyName)) {
        setErrors('propertyName', validations.propertyName(values.propertyName))
        tmpErrors.push('propertyName')

        return tmpErrors
      } else if (errors.propertyName) {
        setErrors('propertyName', '')
      }

      if (validations.googleMaps(values.googleMaps)) {
        setErrors('googleMaps', validations.googleMaps(values.googleMaps))
        tmpErrors.push('googleMaps')
        return tmpErrors
      } else if (errors.googleMaps) {
        setErrors('googleMaps', '')
      }

      if (validations.propertyState(values.state)) {
        setErrors('state', validations.propertyState(values.state))
        tmpErrors.push('propertyState')
        return tmpErrors
      } else if (errors.state) {
        setErrors('state', '')
      }

      if (validations.propertyCity(values.city)) {
        setErrors('city', validations.propertyCity(values.city))
        tmpErrors.push('propertyCity')
        return tmpErrors
      } else if (errors.city) {
        setErrors('city', '')
      }

      if (validations.propertyAddress1(values.address1)) {
        setErrors('address1', validations.propertyAddress1(values.address1))
        tmpErrors.push('propertyAddress1')
        return tmpErrors
      } else if (errors.address1) {
        setErrors('address1', '')
      }

      if (validations.propertyZipCode(values.zipCode)) {
        setErrors('zipCode', validations.propertyZipCode(values.zipCode))
        tmpErrors.push('propertyZipCode')
        return tmpErrors
      } else if (errors.zipCode) {
        setErrors('zipCode', '')
      }

      return tmpErrors
    }

    if (currentStep === 3) {
      const currentValues = Array.from(Object.values(values.amenities))
      return currentValues.includes(true)
    }

    if (currentStep === 6) {
      const newErrors = {
        ...errors,
        address1: validations.propertyAddress1(values.address1),
        propertyName: validations.propertyName(values.propertyName),
        city: validations.propertyCity(values.city),
        state: validations.propertyState(values.state),
        zipCode: validations.propertyZipCode(values.zipCode),
        price: validations.propertyPrice(values.price)
      }

      setErrors('address1', newErrors.address1)
      setErrors('propertyName', newErrors.propertyName)
      setErrors('city', newErrors.city)
      setErrors('state', newErrors.state)
      setErrors('zipCode', newErrors.zipCode)

      return (
        !newErrors.address1 &&
        !newErrors.city &&
        !newErrors.state &&
        !newErrors.zipCode &&
        !newErrors.propertyName
      )
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()

    if (isValidStep && currentStep === 6) {
      const uploadFilesResponse = await fileUtils.uploadFiles(
        uploadedFiles,
        `/api/v1/uploader?setType=image&businessSlug=${user.businessSlug}`
      )

      let images = []

      if (uploadFilesResponse.ok) {
        images = uploadFilesResponse.data.map((data: any) => data.path)
      }

      const cleanValues = JSON.parse(JSON.stringify(values))
      const formData = core.formData.set(new FormData(), cleanValues)
      const password = security.password.encrypt(values.password)

      formData.set('amenities', JSON.stringify(values.amenities))
      formData.set('images', JSON.stringify(images))
      formData.set('password', password)

      if (parentRooms.length > 0) {
        formData.set('rooms', JSON.stringify(parentRooms))
      }

      const response = await setupProfile(formData)

      if (response.status === 200) {
        setCurrentStep((prevState) => prevState + 1)

        const formDataForLogin = new FormData()
        const email = values.email
        const encryptedPassword = password

        formDataForLogin.append(
          security.base64.encode('email', true),
          security.base64.encode(email, true)
        )
        formDataForLogin.append(
          security.base64.encode('password', true),
          security.base64.encode(encryptedPassword, true)
        )

        cookies.set({
          name: 'loggedFromProfileSetup',
          value: 'true'
        })

        await UserActions.login(formDataForLogin)
      }
    }

    if (isValidStep && currentStep < 6) {
      return true
    }

    return false
  }

  const steps = [
    <Step1
      key="step1"
      locale={locale}
      values={values}
      setValues={setValues}
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
      setParentFloors={setParentFloors}
      setParentRooms={setParentRooms}
      setParentSkipFloor13={setParentSkipFloor13}
      setEnableNext={setEnableNext}
      parentFloors={parentFloors}
      parentRooms={parentRooms}
      parentSkipFloor13={parentSkipFloor13}
    />,
    <Step4
      key="step4"
      locale={locale}
      values={values}
      setValues={setValues}
      setEnableNext={setEnableNext}
    />,
    <Step5
      key="step5"
      locale={locale}
      values={values}
      setValues={setValues}
      enableNext={enableNext}
      setEnableNext={setEnableNext}
    />,
    <Step6
      key="step6"
      locale={locale}
      setUploadedFiles={setUploadedFiles}
      uploadedFiles={uploadedFiles}
      setEnableNext={setEnableNext}
    />,
    <Step7
      key="step7"
      values={values}
      locale={locale}
      parentFloors={parentFloors}
      parentRooms={parentRooms}
    />,
    <Step8 key="step8" locale={locale} />
  ]

  useEffect(() => {
    document.body.scrollTop = 0

    return () => {}
  }, [currentStep])

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

      <div
        className={cx.join(
          'flex justify-center w-full min-h-screen overflow-hidden',
          'desktop-height-80vh desktop-overflow-visible'
        )}
      >
        <div className="p-0 rounded-lg h-full overflow-hidden ">
          <div
            className="inner-scroll-content px-1"
            style={{
              overflowY: 'auto',
              height: 'calc(100% - 80px)' // Reserve space for buttons on desktop
            }}
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

      <RenderIf isTrue={currentStep < 7}>
        <div className="sticky h-20 mt-3 bg-white dark:bg-gray-900 z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center h-full">
            <div className="flex w-full justify-between items-center">
              <Button color="dark" onClick={goBack} className="mr-4 h-12">
                {t('common.general.back')}
              </Button>

              <StepIndicator locale={locale} steps={8} currentStep={currentStep + 1} />

              <RenderIf isTrue={currentStep !== 1}>
                <Button
                  color="primary"
                  onClick={validateBeforeGoNext}
                  disabled={!enableNext}
                  className="h-12"
                >
                  {currentStep < 6 ? t('common.general.next') : t('common.general.finish')}
                </Button>
              </RenderIf>
            </div>
          </div>
        </div>
      </RenderIf>
    </>
  )
}

export default Form

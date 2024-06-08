'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import { RenderIf } from '@architecturex/components.renderif'
import is from '@architecturex/utils.is'
import cx from '@architecturex/utils.cx'
import SVG from '@architecturex/components.svg'
import core from '@architecturex/utils.core'

import i18n from '~/app/shared/contexts/server/I18nContext'
import Input from '~/components/Input'
import Button from '~/components/Button'

import * as UserActions from '~/app/shared/actions/user'

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
    country: (value: string) => {
      if (!value) {
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
      country: validations.country(values.country)
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

    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      const response = await UserActions.initialSignup(formData)

      if (!response.ok && response.error?.code === 'EMAIL_ALREADY_EXISTS') {
        setErrors({ ...errors, businessEmail: t(response.error.message as keyof typeof t) })
      } else if (response.ok) {
        setIsRegistered(true)
      }
    }
  }

  const SuccessMessage = () => (
    <div className="flex min-h-[519px] flex-col text-black dark:text-white justify-center m-auto p-1 text-center">
      <h2 className="text-black dark:text-white">{t('justOneMoreStep')}</h2>
      <p className="w-11/12" style={{ margin: '0 auto' }}>
        {t('thankYouForRegistering')}
      </p>
    </div>
  )

  return (
    <div
      className={cx.join(
        'bg-cover bg-center py-20 lg:py-40 3xl:mb-20',
        `min-h-[1150px] 3xl:min-h-[700px]`,
        `bg-[url('/images/bg-hero.svg')] 3xl:bg-[url('/images/bg-hero-flat.svg')]`
      )}
    >
      <div className="container mx-auto mt-10 mb-40 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left md:pr-10 mb-10 md:mb-0">
          <h1 className="text-5xl text-white font-bold">
            Boost Your Business Revenue by +30% <br />
            in just 6 months
          </h1>
          <p className="text-white mt-4 p-6 text-center md:p-0 md:text-left">
            Elevate your bookings by +30% in just six months. Our intelligent platform streamlines
            your workflow, slashing operational expenses and freeing up to 80% of your time-
            empowering you to focus on other areas of your business. Transform your booking
            experience and leverage cutting-edge tools for effortless expansion with hosgu.com.
          </p>
        </div>

        <div className="w-[90%] md:w-1/2 bg-white dark:bg-black p-8 rounded-md shadow-md mb-20">
          <RenderIf isTrue={isRegistered}>
            <SuccessMessage />
          </RenderIf>

          <RenderIf isFalse={isRegistered}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4 relative">
                  <div className="relative mt-1">
                    <Input
                      id="fullName"
                      leftIcon={<SVG.User />}
                      label="Full Name *"
                      name="fullName"
                      placeholder="e.g. John Smith"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <div className="relative mt-1">
                    <Input
                      id="businessName"
                      leftIcon={<SVG.Cabin />}
                      label="Business Name *"
                      name="businessName"
                      placeholder="e.g. Meta Logics"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <div className="relative mt-1">
                    <Input
                      leftIcon={<SVG.Email />}
                      label="Email Address *"
                      name="businessEmail"
                      className={errors.businessEmail ? 'border-red-500 dark:border-red-500' : ''}
                      placeholder="e.g. mail@example.com"
                      required
                      errorText={errors.businessEmail}
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <div className="relative mt-1">
                    <Input
                      leftIcon={<SVG.Phone />}
                      label="Business Phone *"
                      name="businessPhone"
                      placeholder="e.g. +1 234 5677"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <div className="relative mt-1">
                    <Input
                      leftIcon={<SVG.Link />}
                      label="Business Website *"
                      name="businessWebsite"
                      placeholder="e.g. yourdomain.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <div className="relative mt-1">
                    <Input
                      leftIcon={<SVG.World />}
                      label="Country *"
                      name="country"
                      placeholder="e.g. United States"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mb-6 mt-6">
                <Button color="primary" type="submit" fullWidth>
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

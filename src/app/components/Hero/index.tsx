'use client'
import React, { FC, useState, ChangeEvent } from 'react'

import { Input } from '@architecturex/components.input'
import { Button } from '@architecturex/components.button'
import { Translations } from '~app/i18n'

type Props = {
  t: Translations
}

const Hero: FC<Props> = ({ t }) => {
  const [values, setValues] = useState({
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const form = [
    <div key="row-1" className="flex">
      <Input
        id="fullName"
        label="Full name"
        name="fullName"
        placeholder="Full name"
        error
        errorText="This is an error"
        onChange={handleChange}
        value={values.fullName}
      />
      <Input
        label="Business name"
        name="businessName"
        placeholder="Business name"
        error
        errorText="This is an error"
        onChange={handleChange}
        value={values.businessName}
      />
    </div>,
    <div key="row-2" className="flex">
      <Input
        label="Business email"
        name="businessEmail"
        placeholder="Business email"
        error
        errorText="This is an error"
        onChange={handleChange}
        value={values.businessEmail}
      />
      <Input
        label="Business phone"
        name="businessPhone"
        placeholder="Business phone"
        error
        errorText="This is an error"
        onChange={handleChange}
        value={values.businessPhone}
      />
    </div>,
    <div key="row-3" className="flex">
      <Input
        label="Business website"
        name="businessWebsite"
        placeholder="https://"
        error
        errorText="This is an error"
        onChange={handleChange}
        value={values.businessWebsite}
      />
      <Input
        label="Country"
        name="country"
        placeholder="Country"
        error
        errorText="This is an error"
        onChange={handleChange}
        value={values.country}
      />
    </div>
  ]

  return (
    <div
      className="max-w-xLarge m-auto relative h-[900px] lg:h-screen px-8 text-center bg-cover bg-center bg-no-repeat bg-white dark:bg-gray-300"
      style={{ backgroundImage: `url('/images/waves.png')` }}
    >
      <div className="flex justify-between items-center flex-col xl:flex-row pt-5 lg:pt-60">
        <div className="relative z-10 align-center">
          <h1>Boost Your Business Revenue by +30% in just 6 months</h1>
          <p className="pr-6 pb-4">
            Elevate your bookings by +30% in just six months. Our intelligent platform streamlines
            your workflow, slashing operational expenses and freeing up to 80% of your
            time—empowering you to focus on other areas of your business. Transform your booking
            experience and leverage cutting-edge tools for effortless expansion with 1STGUEST.
          </p>
        </div>

        <div className="border-gray-300 shadow-xl rounded bg-white dark:bg-gray-800 w-[400px] md:w-[480px] xl:w-[800px] pt-6">
          {form}

          <div className="flex justify-center mb-6 mt-6">
            <Button color="secondary" shape="rounded" style={{ width: '92%' }}>
              Get Started
            </Button>
          </div>

          <div
            className="flex justify-center mb-6 text-center dark:text-white p-2"
            style={{ fontSize: '10px' }}
          >
            We are committed to your privacy. 1STGuest.com uses the information you provide to us to
            contact you about our relevant content, products, and services. You may unsubscribe at
            any time.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

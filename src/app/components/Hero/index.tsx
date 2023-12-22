'use client'
import React, { FC } from 'react'

import { Input } from '@architecturex/components.input'
import { Button } from '@architecturex/components.button'
import { Translations } from '~app/i18n'
import Select from '~components/Select'

type Props = {
  t: Translations
}

const Hero: FC<Props> = ({ t }) => {
  const image = '/images/waves.png'

  const form = [
    <div key="row-1" className="flex">
      <div className="p-4 text-left">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          htmlFor="username"
        >
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full name"
          className="w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="p-4 text-left">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          htmlFor="username"
        >
          Business name
        </label>
        <input
          type="text"
          placeholder="Business name"
          className="w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>,
    <div key="row-2" className="flex">
      <div className="p-4 text-left">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          htmlFor="username"
        >
          Business email
        </label>
        <input
          type="text"
          placeholder="Business email"
          className="w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="p-4 text-left">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          htmlFor="username"
        >
          Business phone
        </label>
        <input
          type="text"
          placeholder="+52 312 123 4567"
          className="w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>,
    <div key="row-3" className="flex">
      <div className="p-4 text-left">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          htmlFor="username"
        >
          Business website
        </label>
        <input
          type="text"
          placeholder="https://"
          className="w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="p-4 text-left">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 text-left dark:text-gray-300"
          htmlFor="username"
        >
          Country
        </label>
        <input
          type="text"
          placeholder="Mexico"
          className="w-full border p-2 border-gray-300 bg-white rounded text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>
  ]

  return (
    <div
      className="max-w-xLarge m-auto relative h-[900px] lg:h-screen px-8 text-center bg-cover bg-center bg-no-repeat bg-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-between items-center flex-col lg:flex-row pt-5 lg:pt-60">
        <div className="relative z-10 align-center">
          <h1>Boost Your Business Revenue by +30% in just 6 months</h1>
          <p className="pr-6 pb-4">
            Elevate your bookings by +30% in just six months. Our intelligent platform streamlines
            your workflow, slashing operational expenses and freeing up to 80% of your
            time—empowering you to focus on other areas of your business. Transform your booking
            experience and leverage cutting-edge tools for effortless expansion with 1STGUEST.
          </p>
        </div>

        <div className="border-gray-300 shadow-xl rounded bg-white dark:bg-gray-800 w-[400px] md:w-[480px] lg:w-[800px] pt-6">
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

import React, { FC, useId } from 'react'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
}

const Hero: FC<Props> = ({ t }) => {
  const image = '/images/waves.png'

  return (
    <div
      className="max-w-xLarge m-auto relative py-28 px-8 text-center bg-cover bg-center bg-no-repeat bg-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="flex justify-between items-center flex-col lg:flex-row">
        <div className="relative z-10 align-center">
          <h1>Boost Your Business Revenue by +30% in just 6 months</h1>
          <p>
            Elevate your bookings by +30% in just six months. Our intelligent platform streamlines
            your workflow, slashing operational expenses and freeing up to 80% of your
            time—empowering you to focus on other areas of your business. Transform your booking
            experience and leverage cutting-edge tools for effortless expansion with 1STGUEST.
          </p>
          d
        </div>

        <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 mt-10 rounded">
          <form>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">
                  First name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">
                  Last name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="business-name">
                Business name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="business-name"
                type="text"
                placeholder="Business name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="business-email"
              >
                Business email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="business-email"
                type="email"
                placeholder="example@email.com"
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/3 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country-code"
                >
                  Country code
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="country-code"
                >
                  <option>Select...</option>
                  {/* Populate with country codes */}
                </select>
              </div>
              <div className="w-2/3 ml-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="business-phone"
                >
                  Business phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="business-phone"
                  type="tel"
                  placeholder="Business phone"
                />
              </div>
            </div>
            <div className="mb-4">
              <fieldset>
                <legend className="block text-gray-700 text-sm font-bold mb-2">
                  Are you a current Mindbody Business customer?
                </legend>
                <label className="inline-flex items-center">
                  <input type="radio" className="form-radio" name="mindbody-customer" value="yes" />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input type="radio" className="form-radio" name="mindbody-customer" value="no" />
                  <span className="ml-2">No</span>
                </label>
              </fieldset>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
                Industry
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="industry"
              >
                <option>Select your industry</option>
                {/* Populate with industries */}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Let's Talk
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-600 mt-4">
            We're committed to your privacy. Mindbody uses the information you provide to us to
            contact you about our relevant content, products, and services. You may unsubscribe at
            any time.{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              View Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero

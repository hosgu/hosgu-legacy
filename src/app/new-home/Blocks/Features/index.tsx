import React, { FC } from 'react'

import i18n from '~/app/shared/contexts/server/I18nContext'
import SVG from '@architecturex/components.svg'

type Props = {
  locale: string
}

const Features: FC<Props> = ({ locale }) => {
  const t = i18n(locale)

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4" style={{ marginTop: '-40px' }}>
        <h1 className="text-4xl font-bold text-center mb-8 uppercase">
          Manage your bookings <br />
          from start to end
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300">
            <img src="/images/icon_booking.svg" alt="Booking Icon" className="h-16 w-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2 uppercase">Manage your bookings</h2>
            <p className="text-gray-600">Simplify Booking for Everyone</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300">
            <img src="/images/icon_price.svg" alt="Price Icon" className="h-16 w-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2 uppercase">Flexible Pricing</h2>
            <p className="text-gray-600">
              Choose from our free tier or enhanced features to fir your business needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300">
            <img src="/images/icon_business.svg" alt="Business Icon" className="h-16 w-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2 uppercase">Measure your business</h2>
            <p className="text-gray-600">Easily Measure Your Success</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-300">
            <img src="/images/icon_phone.svg" alt="Phone Icon" className="h-16 w-16 mb-4" />
            <h2 className="text-xl font-semibold mb-2 uppercase">
              Run your business from your phone
            </h2>
            <p className="text-gray-600">Stay Connected and Process Sales</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

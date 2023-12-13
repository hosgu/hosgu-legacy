import React, { FC } from 'react'

import { Translations } from '~app/i18n'
import SVGCalendar from '~components/SVG/Calendar'
import SVGMoney from '~components/SVG/Money'
import SVGChart from '~components/SVG/Chart'
import SVGPhone from '~components/SVG/Phone'

type Props = {
  t: Translations
}

const Features: FC<Props> = ({ t }) => {
  return (
    <div data-component="Features" className="bg-white px-8 py-20">
      <h2 className="font-bold mb-10 text-3xl text-center">
        Manage your business from start to end
      </h2>

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVGCalendar className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">Manage your Bookings</h3>

          <p>Simplify booking for everyone with schedules that are easy to set up & manage.</p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVGMoney className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">Flexible Pricing</h3>

          <p>Choose from our free tier or enhanced features to fit your business needs.</p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVGChart className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">Measure your Business</h3>

          <p>Easily measure your success with the industry’s most comprehensive reporting.</p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVGPhone className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">Run your business from your phone</h3>

          <p>Stay connected and process sales wherever you are with 1STGUEST.</p>
        </div>
      </div>
    </div>
  )
}

export default Features

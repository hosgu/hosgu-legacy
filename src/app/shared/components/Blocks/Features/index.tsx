import React, { FC } from 'react'

import i18n from '~/app/shared/contexts/server/I18nContext'
import SVG from '@architecturex/components.svg'

type Props = {
  locale: string
}

const Features: FC<Props> = ({ locale }) => {
  const t = i18n(locale)

  return (
    <div data-component="Features" className="bg-white dark:bg-gray-300 px-8 py-20">
      <h2 className="font-bold mb-10 text-3xl text-center">
        {t('manageYourBusinessFromStartToEnd')}
      </h2>

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVG.Calendar className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">{t('manageYourBookings')}</h3>

          <p>{t('simplifyBookingForEveryone')}.</p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVG.Money className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">{t('flexiblePricing')}</h3>

          <p>{t('chooseFromOurFreeTier')}.</p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVG.Chart className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">{t('measureYourBusiness')}</h3>

          <p>{t('easilyMeasureYourSuccess')}.</p>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-4xl flex justify-center">
              <SVG.Phone className="w-20 h-20 text-center" />
            </span>
          </div>

          <h3 className="font-semibold mb-4 text-xl">{t('runYourBusinessFromYourPhone')}</h3>

          <p>{t('stayConnectedAndProcessSales')}.</p>
        </div>
      </div>
    </div>
  )
}

export default Features

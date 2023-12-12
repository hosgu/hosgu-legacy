import React, { FC } from 'react'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
}

const Features: FC<Props> = ({ t }) => {
  const featuresData = [
    {
      title: t.holisticManagement,
      description: t.fromReservationsToHousekeeping,
      icon: '🔧'
    },
    {
      title: t.flexiblePricing,
      description: t.chooseFromOurFreeTier,
      icon: '💰'
    },
    {
      title: t.increasedVisibility,
      description: t.showcaseYourProperty,
      icon: '🌐'
    },
    {
      title: t.streamlinedOperations,
      description: t.manageGuests,
      icon: '⚙️'
    }
  ]

  return (
    <div data-component="Features" className="bg-wild px-8 py-20 dark:bg-salem dark:text-white">
      <h2 className="font-bold mb-10 text-3xl text-center dark:text-white">{t.features}</h2>

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {featuresData.map((feature, idx) => (
          <div key={idx} className="text-center">
            <div className="mb-4">
              <span className="text-4xl">{feature.icon}</span>
            </div>

            <h3 className="font-semibold mb-4 text-xl">{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features

'use client'
import React, { FC } from 'react'

import cx from '@architecturex/utils.cx'

import i18n from '~/app/core/contexts/server/I18nContext'
import Registration from '../Registration'

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
          <h1 className="text-5xl text-white font-bold">{t('home.hero.information.headline')}</h1>
          <p className="text-white mt-4 p-6 text-center md:p-0 md:text-left">
            {t('home.hero.information.text')}
          </p>
        </div>

        <Registration />
      </div>
    </div>
  )
}

export default Hero

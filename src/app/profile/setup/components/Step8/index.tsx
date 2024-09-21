'use client'
import React, { FC } from 'react'
import Link from '~/app/shared/components/Link'

import i18n from '~/app/core/contexts/server/I18nContext'

type Props = {
  locale: string
}

const Step: FC<Props> = ({ locale }) => {
  const t = i18n(locale)

  return (
    <div className="h-screen flex flex-row content-center">
      <div className="flex flex-col justify-center items-center text-center w-full">
        <h1 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
          {t('profile.setup.step8.headline')}
        </h1>
        <p className="mb-5">
          {t('profile.setup.step8.subheadline')}
          <br />
          {t('profile.setup.step8.subheadline2')}
          <Link href="/control">
            <b>dashboard</b>
          </Link>{' '}
          {t('profile.setup.step8.subheadline2cont')}
        </p>
      </div>
    </div>
  )
}

export default Step

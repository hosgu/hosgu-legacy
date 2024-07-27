'use client'
import React, { FC } from 'react'
import Link from '~/app/shared/components/Link'

import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
}

const Step: FC<Props> = ({ locale }) => {
  const t = i18n(locale)

  return (
    <div className="flex flex-col justify-center items-center text-center w-full">
      <p className="mb-5">
        profile.setup.step8.subheadline
        <br />
        profile.setup.step8.subheadline2{' '}
        <Link href="/control">
          <b>dashboard</b>
        </Link>{' '}
        profile.setup.step8.subheadline2cont
      </p>
    </div>
  )
}

export default Step

'use client'
import { FC } from 'react'
import Button from '~/components/Button'

import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
}

const TryNow: FC<Props> = ({ locale }) => {
  const t = i18n(locale)

  const handleTryFree = () => {
    const inputElement = document.getElementById('fullName')

    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <div
      data-component="TryNow"
      className="bg-white px-8 py-16 text-center dark:bg-black dark:text-white"
    >
      <p className="mb-4 text-2xl">{t('readyToTransformYourExperience')}</p>

      <Button color="secondary" bold onClick={handleTryFree}>
        {t('tryNow')}
      </Button>
    </div>
  )
}

export default TryNow

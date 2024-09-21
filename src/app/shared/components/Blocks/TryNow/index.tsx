'use client'
import { FC } from 'react'
import Button from '~/components/Button'

import i18n from '~/app/core/contexts/server/I18nContext'

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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-10 flex flex-col md:flex-row items-center md:justify-between"
          data-testid="trynow-container"
        >
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0" data-testid="trynow-headline">
            {t('home.blocks.tryNow.headline.line1')} <br />
            {t('home.blocks.tryNow.headline.line2')}
          </h1>
          <Button color="secondary" bold onClick={handleTryFree}>
            {t('home.blocks.tryNow.button')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TryNow

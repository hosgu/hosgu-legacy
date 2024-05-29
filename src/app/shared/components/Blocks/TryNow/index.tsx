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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-10 flex flex-col md:flex-row items-start items-center md:justify-between">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Ready to transform your property management <br />
            experience?
          </h1>
          <Button color="secondary" bold onClick={handleTryFree}>
            {t('tryNow')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TryNow

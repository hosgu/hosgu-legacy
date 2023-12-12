import { FC } from 'react'
import { cookies } from 'next/headers'

import services from '~/app/services'
import { getI18n, Locale } from '~/app/i18n'

import Header from '~components/Header'
import Hero from '~components/Hero'
import Footer from '~components/Footer'

type Props = {
  params: {
    locale: Locale
  }
}

const Page: FC<Props> = async ({ params: { locale = 'en-us' } }) => {
  const cookieStore = cookies()
  const t = await getI18n(locale)
  const connectedUser = await services.users.connectedUser(cookieStore.get('at')?.value || '')

  const MissionSection = () => {
    return (
      <div className="bg-white py-10 dark:bg-black dark:text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">{t.ourMission}</h2>
          <p className="text-lg text-center">{t.missionText}</p>
        </div>
      </div>
    )
  }

  const VisionSection = () => {
    return (
      <div className="bg-white py-10 dark:bg-black dark:text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">{t.ourVision}</h2>
          <p className="text-lg text-center">{t.visionText}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header t={t} locale={locale} connectedUser={connectedUser} logoPosition="right" />
      </div>
      <Hero t={t} />

      <MissionSection />
      <VisionSection />
      <Footer t={t} locale={locale} />
    </>
  )
}

export default Page

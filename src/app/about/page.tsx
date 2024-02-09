import { NextPage } from 'next'
import { cookies } from 'next/headers'

import { getConnectedUser } from '~/app/shared/services/users'
import getI18nFromServer from '~/app/shared/contexts/server/I18nContext'
import Header from '~/app/shared/components/Header'
import Hero from '~/app/shared/components/Hero'
import Footer from '~/app/shared/components/Footer'

const Page: NextPage = async () => {
  const cookieStore = cookies()
  const locale = cookieStore.get('language')?.value || 'en-us'
  const t = getI18nFromServer(locale)
  const connectedUser = await getConnectedUser(cookieStore.get('at')?.value || '')

  const MissionSection = () => {
    return (
      <div className="bg-white py-10 dark:bg-black dark:text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">{t('ourMission')}</h2>
          <p className="text-lg text-center">{t('missionText')}</p>
        </div>
      </div>
    )
  }

  const VisionSection = () => {
    return (
      <div className="bg-white py-10 dark:bg-black dark:text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">{t('ourVision')}</h2>
          <p className="text-lg text-center">{t('visionText')}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-black dark:text-white">
        <Header t={t} locale={locale} connectedUser={connectedUser} />
      </div>
      <Hero t={t} />

      <MissionSection />
      <VisionSection />
      <Footer t={t} locale={locale} />
    </>
  )
}

export default Page

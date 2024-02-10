'use client'
import React, { FC } from 'react'

import Image from 'next/image'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  setValues: any
  setStep: any
  setIsDisabled: any
}

const Step: FC<Props> = ({ locale = 'en-us', setValues, setStep, setIsDisabled }) => {
  const t = i18n(locale)

  return (
    <>
      <div className="flex w-full justify-between mt-20">
        <div
          className="cursor-pointer"
          onClick={() => {
            setValues((prevState: any) => ({
              ...prevState,
              propertyType: 'cabin'
            }))
            setIsDisabled(false)
            setStep((prevState: any) => prevState + 1)
          }}
          title={t('cabin')}
        >
          <div className="w-24 h-24 mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
            <Image src="/images/icons/cabin.png" alt="Cabin" width={64} height={64} />
          </div>
          <div className="text-center text-sm">{t('cabin')}</div>
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            setValues((prevState: any) => ({
              ...prevState,
              propertyType: 'hotel'
            }))
            setIsDisabled(false)
            setStep((prevState: any) => prevState + 1)
          }}
          title={t('hotel')}
        >
          <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
            <Image src="/images/icons/hotel.png" alt="Hotel" width={64} height={64} />
          </div>
          <div className="text-center text-sm">{t('hotel')}</div>
        </div>
      </div>
    </>
  )
}

export default Step

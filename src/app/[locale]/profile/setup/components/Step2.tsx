'use client'
import React, { FC, useState, useEffect, ChangeEvent, useTransition } from 'react'
import Image from 'next/image'

import { Translations } from '~app/i18n'

type Props = {
  t: Translations
  setValues: any
  setStep: any
  setIsDisabled: any
}

const Step: FC<Props> = ({ t, setValues, setStep, setIsDisabled }) => (
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
        title={t.cabin}
      >
        <div className="w-24 h-24 mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
          <Image src="/images/icons/cabin.png" alt="Cabin" width={64} height={64} />
        </div>
        <div className="text-center text-sm">{t.cabin}</div>
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
        title={t.hotel}
      >
        <div className="w-24 h-24 mx-auto mb-2 bg-gray-300 dark:bg-black rounded-full flex items-center justify-center">
          <Image src="/images/icons/hotel.png" alt="Hotel" width={64} height={64} />
        </div>
        <div className="text-center text-sm">{t.hotel}</div>
      </div>
    </div>
  </>
)

export default Step

import React, { FC, useId } from 'react'
import device from '@architecturex/utils.device'

import { Translations } from '~app/i18n'

const mobilePath = device.is('mobile') ? 'mobile/' : ''

const images = [
  `/photos/${mobilePath}1.jpg`,
  `/photos/${mobilePath}2.jpg`,
  `/photos/${mobilePath}3.jpg`,
  `/photos/${mobilePath}4.jpg`,
  `/photos/${mobilePath}5.jpg`,
  `/photos/${mobilePath}6.jpg`
]

type Props = {
  t: Translations
}

const Hero: FC<Props> = ({ t }) => {
  const randomIndex = Math.floor(Math.random() * images.length)
  const correctIndex = randomIndex >= images.length ? 0 : randomIndex
  const randomImage = images[correctIndex]

  return (
    <div
      className="relative py-72 px-8 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${randomImage})` }}
    >
      <div className="relative z-10 text-white">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            {t.transforming}
          </span>{' '}
          <span className="px-2 py-1 rounded bg-yellow-300">{t.hospitality}</span>
        </h1>
        <p className="text-xl bg-inherit" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          {t.simplify}
        </p>
      </div>
    </div>
  )
}

export default Hero

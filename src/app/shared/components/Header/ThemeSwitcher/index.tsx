'use client'
import React, { FC } from 'react'
import SVG from '@architecturex/components.svg'

import i18n from '~/app/shared/contexts/server/I18nContext'
import { useTheme } from '~/app/shared/contexts/client/ThemeContext'

type Props = {
  locale: string
}

const ThemeSwitcher: FC<Props> = ({ locale }) => {
  const t = i18n(locale)
  const { darkMode, toggleDarkMode } = useTheme()

  const stroke = darkMode ? 'white' : 'black'

  return (
    <div data-component="ThemeSwitcher" className="flex focus:outline-none items-center space-x-2">
      {darkMode ? (
        <SVG.Moon stroke={stroke} label={t('changeToLightMode')} onClick={toggleDarkMode} />
      ) : (
        <SVG.Sun stroke={stroke} label={t('changeToDarkMode')} onClick={toggleDarkMode} />
      )}
    </div>
  )
}

export default ThemeSwitcher

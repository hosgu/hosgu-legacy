'use client'
import React, { FC } from 'react'

import { Translations } from '~app/i18n'

import SVG from '@architecturex/components.svg'
import { useTheme } from '~contexts/ThemeContext'

type Props = {
  t: Translations
}

const ThemeSwitcher: FC<Props> = ({ t }) => {
  const { darkMode, toggleDarkMode } = useTheme()

  const stroke = darkMode ? '#fff' : '#000'

  return (
    <div data-component="ThemeSwitcher" className="flex focus:outline-none items-center space-x-2">
      {darkMode ? (
        <SVG.Moon stroke={stroke} label={t.changeToLightMode} onClick={toggleDarkMode} />
      ) : (
        <SVG.Sun stroke={stroke} label={t.changeToDarkMode} onClick={toggleDarkMode} />
      )}
    </div>
  )
}

export default ThemeSwitcher

'use client'
import React, { FC } from 'react'
import SVG from '@architecturex/components.svg'

import i18n from '~/app/core/contexts/server/I18nContext'
import { useTheme } from '~/app/core/contexts/client/ThemeContext'

type Props = {
  locale: string
}

const ThemeSwitcher: FC<Props> = ({ locale }) => {
  const t = i18n(locale)
  const { darkMode, toggleDarkMode } = useTheme()

  const stroke = darkMode ? '#eab308' : '#1d4ed8'

  return (
    <div
      data-component="ThemeSwitcher"
      data-testid="theme-switcher"
      className="flex focus:outline-none items-center space-x-2"
    >
      {darkMode ? (
        <SVG.Moon
          color={stroke}
          label="changeToLightMode"
          onClick={toggleDarkMode}
          data-testid="svg-moon"
        />
      ) : (
        <SVG.Sun
          color={stroke}
          label="changeToDarkMode"
          onClick={toggleDarkMode}
          data-testid="svg-sun"
        />
      )}
    </div>
  )
}

export default ThemeSwitcher

'use client'
import { FC } from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'
import cx from '@architecturex/utils.cx'

import { useTheme } from '~/app/shared/contexts/client/ThemeContext'

type Props = {
  style?: 'light' | 'dark'
  className?: string
  slogan: string
  position?: 'below' | 'right'
}

const SVNGilroyBold = localFont({ src: '../../fonts/SVNGilroyBold.otf' })
const SVNGilroyLight = localFont({ src: '../../fonts/SVNGilroyLight.otf' })

const tw = {
  light: 'text-white',
  dark: 'text-green-950',
  slogan: '-mt-1 font-normal text-center text-xs uppercase',
  text: 'font-bold text-2xl text-center'
} as const

const Logo: FC<Props> = ({ className = '', slogan, position = 'below', style }) => (
  <Link href="/" className="hover:no-underline" title="1ST Guest">
    <div
      data-component="Logo"
      className={cx.join('flex items-center', className, {
        'flex-col': position === 'below',
        'flex-row': position === 'right'
      })}
    >
      <img src={`/images/logo.png`} alt="1ST Guest" className="w-32" />
    </div>
  </Link>
)

export default Logo

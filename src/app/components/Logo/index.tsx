'use client'
import { FC } from 'react'
import cx from '@architecturex/utils.cx'
import Link from 'next/link'
import localFont from 'next/font/local'

import SVGLogo from '~/app/components/SVG/Logo'
import { useTheme } from '~contexts/ThemeContext'

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

const Logo: FC<Props> = ({ className = '', slogan, position = 'below', style }) => {
  const { darkMode } = useTheme()
  const isDark = style === 'dark' || darkMode

  return (
    <Link href="/" className="hover:no-underline" title="True Cabins">
      <div
        data-component="Logo"
        className={cx.join('flex items-center', className, {
          'flex-col': position === 'below',
          'flex-row': position === 'right'
        })}
      >
        <div
          className={cx.join('flex flex-col', {
            'ml-2': position === 'right'
          })}
        >
          <span className={cx.join(!isDark ? tw.dark : tw.light, tw.text)}>
            <span
              className={SVNGilroyBold.className}
              style={{ color: isDark ? '#fff' : '#222', marginRight: '1px' }}
            >
              1ST
            </span>
            <span className={SVNGilroyLight.className}>GUEST.com</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Logo

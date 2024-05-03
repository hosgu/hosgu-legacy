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

const tw = {
  light: 'text-white',
  dark: 'text-green-950',
  slogan: '-mt-1 font-normal text-center text-xs uppercase',
  text: 'font-bold text-2xl text-center'
} as const

const Logo: FC<Props> = ({ className = '', position = 'below', style }) => {
  const { darkMode } = useTheme()
  const isDark = style === 'dark' || darkMode

  return (
    <Link href="/" className="hover:no-underline" title="1ST Guest">
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
          <span className={cx.join(!isDark ? tw.dark : tw.light, tw.text, 'flex')}>
            <span style={{ marginRight: '1px' }}>
              <img src="/images/isotype.svg" alt="Guestty.com" style={{ width: '30px' }} />
            </span>
            <span
              className={cx.join(
                SVNGilroyBold.className,
                'bg-gradient-to-r from-[#02a7c5] to-[#03d085] text-transparent bg-clip-text',
                'text-3xl'
              )}
              style={{
                marginLeft: '5px',
                marginTop: '0px'
              }}
            >
              GUEHOST
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Logo

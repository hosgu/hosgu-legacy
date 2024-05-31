'use client'
import { FC } from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'
import cx from '@architecturex/utils.cx'
import { RenderIf } from '@architecturex/components.renderif'

import { useTheme } from '~/app/shared/contexts/client/ThemeContext'

type Props = {
  style?: 'light' | 'dark'
  className?: string
  position?: 'below' | 'right'
  includeText?: boolean
  alternativeText?: string
}

const SVNGilroyBold = localFont({ src: '../../fonts/SVNGilroyBold.otf' })

const tw = {
  light: 'text-white',
  dark: 'text-green-950',
  text: 'font-bold text-2xl text-center'
} as const

const Logo: FC<Props> = ({
  className = '',
  position = 'below',
  style,
  includeText = true,
  alternativeText = ''
}) => {
  const { darkMode } = useTheme()
  const isDark = style === 'dark' || darkMode

  const isotype = {
    url: '/images/isotype.svg',
    from: 'from-[#27bcfd]',
    to: 'to-[#88c54a]'
  }

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
              <img src={isotype.url} alt="hosgu.com" style={{ width: '30px' }} />
            </span>

            <RenderIf isTrue={includeText}>
              <span
                className={cx.join(
                  SVNGilroyBold.className,
                  `bg-gradient-to-r ${isotype.from} ${isotype.to} text-transparent bg-clip-text`,
                  'text-3xl'
                )}
                style={{
                  marginLeft: '5px',
                  marginTop: '0px'
                }}
              >
                hosgu
              </span>
            </RenderIf>

            <RenderIf isTrue={!includeText && !!alternativeText}>
              <span
                className={cx.join(SVNGilroyBold.className, 'text-black text-lg')}
                style={{
                  marginLeft: '5px',
                  marginTop: '5px'
                }}
              >
                {alternativeText}
              </span>
            </RenderIf>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Logo

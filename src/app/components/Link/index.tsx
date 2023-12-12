import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactElement } from 'react'

interface LinkProps extends Omit<NextLinkProps, 'href' | 'as'> {
  href: string
  children: React.ReactNode | React.ReactNode[]
  locale?: string
  className?: string
}

const Link = ({
  href,
  children,
  locale: localeOverride,
  className = undefined,
  ...props
}: LinkProps): ReactElement => {
  const locale = usePathname().split('/')[1] || 'en-us'
  const localeToUse = localeOverride || locale
  const hrefWithLocale = href.startsWith('/') ? `/${localeToUse}${href}` : href

  return (
    <NextLink href={hrefWithLocale} className={className} {...props}>
      {children}
    </NextLink>
  )
}

export default Link

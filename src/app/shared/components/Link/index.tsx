import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import React, { ReactElement } from 'react'

interface LinkProps extends Omit<NextLinkProps, 'href' | 'as'> {
  href: string
  children: ReactElement | ReactElement[]
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
  return (
    <NextLink href={href} className={className} {...props}>
      {children}
    </NextLink>
  )
}

export default Link

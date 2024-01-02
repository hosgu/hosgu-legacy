'use client'
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@architecturex/components.button'
import { Input } from '@architecturex/components.input'
import security from '@architecturex/utils.security'

import { Translations, Locale } from '~app/i18n'
import { loginServerAction } from '../../../actions/login'

type Props = {
  t: Translations
  locale: Locale
}

type Errors = {
  invalidLogin?: string
}

const Form: FC<Props> = ({ t, locale }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Errors>({ invalidLogin: '' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append(security.base64.encode('email', true), security.base64.encode(email, true))
    formData.append(
      security.base64.encode('password', true),
      security.base64.encode(security.password.encrypt(password), true)
    )

    if (!email || !password) {
      return setErrors({ invalidLogin: t.invalidLogin })
    }

    const response = await loginServerAction(formData)

    if (response?.ok) {
      window.location.href = '/'
    } else {
      setErrors({
        invalidLogin: t[response?.error.message as keyof typeof t]
      })
    }
  }

  return (
    <>
      <Input label={t.email} value={email} onChange={(e) => setEmail(e.target.value)} required />

      <Input
        label={t.password}
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <p className="text-red-500 mb-4 text-xs">{errors.invalidLogin}</p>

      <div className="flex justify-center items-center mb-4 text-sm text-gray-400">
        <Link href={`/${locale}/signup`} className="mr-4 hover:no-underline hover:text-gray-500">
          {t.createNewAccount}
        </Link>
        <Link href={`/${locale}/forgot`} className="hover:no-underline hover:text-gray-500">
          {t.forgot}
        </Link>
      </div>

      <div className="flex justify-center items-center mb-4">
        <Button color="secondary" shape="circle" onClick={handleSubmit}>
          {t.connect}
        </Button>
      </div>
    </>
  )
}

export default Form

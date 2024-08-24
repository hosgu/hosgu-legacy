'use client'
import React, { FC, useState, useEffect } from 'react'
import security from '@architecturex/utils.security'
import SVG from '@architecturex/components.svg'
import i18n from '~/app/shared/contexts/server/I18nContext'
import * as UserActions from '~/app/shared/actions/user'

import Input from '~/components/Input'
import Button from '~/components/Button'

type Props = {
  locale: string
}

type Errors = {
  invalidLogin?: string
}

const Form: FC<Props> = ({ locale }) => {
  const t = i18n(locale)

  const [errors, setErrors] = useState<Errors>({ invalidLogin: '' })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.classList.add('bg-login')

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    formData.delete('email')
    formData.delete('password')

    formData.append(security.base64.encode('email', true), security.base64.encode(email, true))
    formData.append(
      security.base64.encode('password', true),
      security.base64.encode(security.password.encrypt(password), true)
    )

    if (!email || !password) {
      return setErrors({ invalidLogin: t('login.invalidLogin') })
    }

    const response = await UserActions.login(formData)

    if (response?.ok) {
      window.location.href = '/'
    } else {
      setErrors({
        invalidLogin: t('login.invalidLogin')
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center min-h-screen">
        <div
          id="form-container"
          className="bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-[450px]"
        >
          <div className="flex justify-center mb-4">
            <img src="/images/isotype.svg" alt="Logo" className="w-16 h-16" />
          </div>

          <h2 className="text-2xl font-medium text-center mb-4 text-gray-800 dark:text-white toggle-text-dark-mode">
            {t('login.headline')}
          </h2>

          <div className="relative mb-4">
            <div className="relative">
              <Input
                name="email"
                leftIcon={<SVG.Email />}
                label={t('common.user.email')}
                type="email"
                placeholder={t('login.input.email.placeholder')}
                id="email"
                required
              />
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <Input
                name="password"
                leftIcon={<SVG.Lock />}
                label={t('common.input.password')}
                type="password"
                placeholder={t('login.input.password.placeholder')}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mb-4 mt-4 m-auto">
            <a href="#" className="text-sm text-green-500 dark:text-green-500 hover:underline">
              {t('login.forgotPassword')}
            </a>
          </div>

          <div className="m-auto">
            <Button color="primary" fullWidth type="submit">
              {t('common.general.login')}
            </Button>
          </div>

          <div className="text-gray-500 dark:text-gray-300 mt-6 flex items-center justify-center">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-4 toggle-text-dark-mode">{t('login.or')}</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <div className="text-center mt-4 text-gray-500 dark:text-gray-300 toggle-text-dark-mode">
            {t('login.newHere')}{' '}
            <a href="#" className="text-green-500 dark:text-green-500 font-medium hover:underline">
              {t('login.createAccount')}
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form

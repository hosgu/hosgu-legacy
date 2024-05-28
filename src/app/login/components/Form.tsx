'use client'
import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import security from '@architecturex/utils.security'

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

    formData.append(security.base64.encode('email', true), security.base64.encode(email, true))
    formData.append(
      security.base64.encode('password', true),
      security.base64.encode(security.password.encrypt(password), true)
    )

    if (!email || !password) {
      return setErrors({ invalidLogin: t('invalidLogin') })
    }

    const response = await UserActions.login(formData)

    if (response?.ok) {
      window.location.href = '/'
    } else {
      setErrors({
        invalidLogin: t(response?.error?.message as string)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center min-h-screen">
        <div
          id="form-container"
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-[450px]"
        >
          <div className="flex justify-center mb-4">
            <img src="/images/isotype.svg" alt="Logo" className="w-16 h-16" />
          </div>
          <h2 className="text-2xl font-medium text-center mb-4 text-gray-800 dark:text-white toggle-text-dark-mode">
            Login to your account
          </h2>
          <div className="relative">
            <div className="relative">
              <Input
                label="Email:"
                type="email"
                placeholder="Please enter your email"
                id="email"
                className="input-light dark:input-dark mt-1 block w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div className="relative">
            <div className="relative">
              <Input
                label="Password:"
                type="password"
                placeholder="Please enter your password"
                id="password"
                className="input-light dark:input-dark mt-1 block w-full pl-10 pr-10 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <i
                  id="toggle-password-visibility"
                  className="far fa-eye text-gray-500 dark:text-gray-300"
                ></i>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4 w-[91%] m-auto">
            <label htmlFor="remember-me" className="flex items-center cursor-pointer">
              <input type="checkbox" id="remember-me" className="mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-300 toggle-text-dark-mode">
                Remember Me
              </span>
            </label>
            <a href="#" className="text-sm text-green-500 dark:text-green-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="w-[91%] m-auto">
            <Button color="primary" fullWidth>
              Login
            </Button>
          </div>

          <div className="text-gray-500 dark:text-gray-300 mt-6 flex items-center justify-center">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-4 toggle-text-dark-mode">Or</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <div className="text-center mt-4 text-gray-500 dark:text-gray-300 toggle-text-dark-mode">
            You’re new here?{' '}
            <a href="#" className="text-green-500 dark:text-green-500 font-medium hover:underline">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </form>
  )

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <Input label={t('email')} name="email" required />

  //     <Input
  //       label={t('password')}
  //       name="password"
  //       type="password"
  //       autoComplete="new-password"
  //       required
  //     />

  //     <p className="text-red-500 mb-4 text-xs">{errors.invalidLogin}</p>

  //     <div className="flex justify-center items-center mb-4 text-sm text-gray-400">
  //       <Link href={`/signup`} className="mr-4 hover:no-underline hover:text-gray-500">
  //         {t('createNewAccount')}
  //       </Link>
  //       <Link href={`/forgot`} className="hover:no-underline hover:text-gray-500">
  //         {t('forgot')}
  //       </Link>
  //     </div>

  //     <div className="flex justify-center items-center mb-4">
  //       <Button shape="circle" type="submit">
  //         {t('connect')}
  //       </Button>
  //     </div>
  //   </form>
  // )
}

export default Form

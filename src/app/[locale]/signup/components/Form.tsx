'use client'
import React, { FC, useState, useEffect } from 'react'
import is from '@architecturex/utils.is'
import security from '@architecturex/utils.security'
import { Button } from '@architecturex/components.button'
import { Input } from '@architecturex/components.input'

import { signupServerAction } from '../actions'
import { Translations } from '~app/i18n'

type Props = {
  t: Translations
}

type Errors = {
  email?: string
  password?: string
}

const Form: FC<Props> = ({ t }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' })
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleSubmit = async () => {
    let hasErrors = false
    const passwordValidation = security.password.validation(password)
    let emailError = ''

    setIsClicked(true)

    if (!is(email).email()) {
      hasErrors = true
      emailError = t.invalidEmail

      setErrors({
        email: emailError
      })
    }

    if (!passwordValidation.isValid) {
      hasErrors = true
      setIsClicked(false)

      if (passwordValidation.reasons?.includes('length')) {
        setErrors({
          email: emailError,
          password: t.passwordLength
        })

        return
      }

      if (passwordValidation.reasons?.includes('lowercase')) {
        setErrors({
          email: emailError,
          password: t.passwordLowercase
        })

        return
      }

      if (passwordValidation.reasons?.includes('uppercase')) {
        setErrors({
          email: emailError,
          password: t.passwordUppercase
        })

        return
      }

      if (passwordValidation.reasons?.includes('digit')) {
        setErrors({
          email: emailError,
          password: t.passwordDigit
        })

        return
      }

      if (passwordValidation.reasons?.includes('special')) {
        setErrors({
          email: emailError,
          password: t.passwordSpecial
        })

        return
      }
    }

    if (hasErrors) {
      return
    }

    const formData = new FormData()

    formData.append(security.base64.encode('email', true), security.base64.encode(email, true))
    formData.append(
      security.base64.encode('password', true),
      security.base64.encode(security.password.encrypt(password), true)
    )

    const response = await signupServerAction(formData)

    if (response?.ok) {
      setStatus('success')
    } else {
      setIsClicked(false)

      setErrors({
        email: response.error?.code === 'MISSING_FIELDS' ? t.missingFields : ''
      })
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center items-center text-center w-full">
        <h2 className="text-xl font-bold mb-4 text-center dark:text-white">{t.accountCreated}</h2>

        <p className="mb-5">
          {t.weHaveSentAConfirmationEmailTo} <b>{email}</b>.
        </p>

        <p className="mb-5">{t.pleaseFollowTheInstructions}</p>

        <p>{t.ifYouDoNotReceiveTheEmail}</p>
      </div>
    )
  }

  return (
    <>
      <Input
        label={t.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isClicked}
        className={errors.email ? 'border-red-500 dark:border-red-500' : ''}
      />

      <p className="text-red-500 mb-4 text-xs">{errors.email}</p>

      <Input
        label={t.password}
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isClicked}
        className={errors.password ? 'border-red-500 dark:border-red-500' : ''}
      />

      <p className="text-red-500 mb-4 text-xs">{errors.password}</p>

      <div className="flex justify-center items-center mb-4">
        <Button color="secondary" shape="circle" onClick={handleSubmit} disabled={isClicked}>
          {isClicked ? t.creatingAccount : t.createNewAccount}
        </Button>
      </div>
    </>
  )
}

export default Form

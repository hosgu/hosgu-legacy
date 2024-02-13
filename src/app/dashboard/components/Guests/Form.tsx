'use client'
import { FC, useState, ChangeEvent } from 'react'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import { RenderIf } from '@architecturex/components.renderif'

import Notification from '~/components/Notification'
import Button from '~/components/Button'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'
import { editServerAction, createGuestServerAction } from '~/app/shared/actions/dashboard/guest'

type Props = {
  action: 'save' | 'edit'
  data?: any
}

const Form: FC<Props> = ({
  data: {
    id = '',
    businessId = '',
    fullName = '',
    email = '',
    phone = '',
    website = '',
    facebook = '',
    instagram = '',
    gender = '',
    birthday = '',
    organization = '',
    taxIdentifier = '',
    notes = '',
    photo = ''
  },
  action = 'save'
}) => {
  const initialValues = {
    id,
    businessId,
    fullName,
    email,
    phone,
    website,
    facebook,
    instagram,
    gender,
    birthday,
    organization,
    taxIdentifier,
    notes,
    photo
  }
  const [showNotification, setShowNotification] = useState(false)

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

  const validations = {
    fullName: (value: string) => {
      if (!value) {
        return 'Please enter a fullname'
      }

      if (value.length < 2) {
        return 'Please enter a valid fullname'
      }

      return ''
    },
    email: (value: string) => {
      if (!value) {
        return 'Please enter an email'
      }

      if (!is(value).email()) {
        return 'Please enter a valid email'
      }

      return ''
    },
    phone: (value: string) => {
      if (!value) {
        return 'Please enter a phone number'
      }

      if (!is(value).phone()) {
        return 'Please enter a valid phone number'
      }

      return ''
    }
  }

  const validate = (values: any) => {
    const newErrors = {
      ...errors,
      fullName: validations.fullName(values.fullName),
      email: validations.email(values.email),
      phone: validations.phone(values.phone)
    }

    setErrors(newErrors)

    return !newErrors.fullName && !newErrors.email && !newErrors.phone
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      const response =
        action === 'save'
          ? await createGuestServerAction(formData)
          : await editServerAction(formData)

      if (response.status === 200) {
        setShowNotification(true)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RenderIf isTrue={showNotification}>
        <Notification message="Guest saved successfully" type="success" />
      </RenderIf>

      <RenderIf isTrue={action === 'edit'}>
        <input type="hidden" name="id" value={initialValues.id} />
      </RenderIf>

      <input type="hidden" name="businessId" value={initialValues.businessId} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input label="Photo" name="photo" required />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words"></p>
        </div>

        <div>
          <Input
            label="Full name"
            name="fullName"
            className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
            required
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.fullName}</p>
        </div>

        <div>
          <Input
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            required
            className={errors.email ? 'border-red-500 dark:border-red-500' : ''}
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.email}</p>
        </div>

        <div>
          <Input
            label="Phone"
            name="phone"
            placeholder="+1 999 999 9999"
            required
            className={errors.phone ? 'border-red-500 dark:border-red-500' : ''}
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.phone}</p>
        </div>

        <Input label="Website" name="website" />

        <Input label="Facebook" name="facebook" />

        <Input label="Instagram" name="instagram" />

        <Input label="Gender" name="gender" />
        <Input label="Birthday" name="birthday" placeholder="MM/DD/YYYY" required />
        <Input label="Organization" name="organization" />
        <Input label="Tax Identifier" name="taxIdentifier" />

        <TextArea label="Notes" name="notes" />
      </div>
      <div className="flex justify-center">
        <Button type="submit" color="secondary" shape="square" size="large" fullWidth>
          Save
        </Button>
      </div>
    </form>
  )
}

export default Form

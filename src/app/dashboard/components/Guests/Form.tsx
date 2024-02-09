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

const Form: FC<any> = ({
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
  const [values, setValues] = useState(initialValues)

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name !== '' && value !== '') {
      setValues((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

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

  const validate = () => {
    const newErrors = {
      ...errors,
      fullName: validations.fullName(values.fullName),
      email: validations.email(values.email),
      phone: validations.phone(values.phone)
    }

    setErrors(newErrors)

    return !newErrors.fullName && !newErrors.email && !newErrors.phone
  }

  const handleSubmit = async () => {
    const isValidForm = validate()

    if (isValidForm) {
      if (action === 'save') {
        delete values.id
      }

      const formData = core.formData.set(new FormData(), values)

      const response =
        action === 'save'
          ? await createGuestServerAction(formData)
          : await editServerAction(formData)

      if (response.status === 200) {
        setShowNotification(true)
        setValues(initialValues)
      }
    }
  }

  return (
    <>
      <RenderIf isTrue={showNotification}>
        <Notification message="Guest saved successfully" type="success" />
      </RenderIf>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input label="Photo" name="photo" value={values.photo} onChange={handleChange} required />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words"></p>
        </div>

        <div>
          <Input
            label="Full name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
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
            value={values.email}
            onChange={handleChange}
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
            value={values.phone}
            onChange={handleChange}
            required
            className={errors.phone ? 'border-red-500 dark:border-red-500' : ''}
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.phone}</p>
        </div>

        <Input
          label="Website"
          name="website"
          value={values.website}
          onChange={handleChange}
          required
        />

        <Input
          label="Facebook"
          name="facebook"
          value={values.facebook}
          onChange={handleChange}
          required
        />

        <Input
          label="Instagram"
          name="instagram"
          value={values.instagram}
          onChange={handleChange}
          required
        />

        <Input
          label="Gender"
          name="gender"
          value={values.gender}
          onChange={handleChange}
          required
        />
        <Input
          label="Birthday"
          name="birthday"
          placeholder="MM/DD/YYYY"
          value={values.birthday}
          onChange={handleChange}
          required
        />
        <Input
          label="Organization"
          name="organization"
          value={values.organization}
          onChange={handleChange}
          required
        />
        <Input
          label="Tax Identifier"
          name="taxIdentifier"
          value={values.taxIdentifier}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Notes"
          value={values.notes}
          name="notes"
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-center">
        <Button color="secondary" onClick={handleSubmit} shape="circle" size="large" fullWidth>
          Save
        </Button>
      </div>
    </>
  )
}

export default Form

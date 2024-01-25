'use client'
import { FC, useState, ChangeEvent } from 'react'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import { createGuestServerAction } from '~/app/actions/dashboard/guest'
import Button from '~/components/Button'
import Input from '~components/Input'

type Props = {
  headers: string[]
  rows: string[][]
}

const CreateGuestForm: FC<any> = () => {
  const [values, setValues] = useState({
    businessId: '61838f2c-d501-4ab2-be97-82ce86fedd56',
    fullName: '',
    email: '',
    phone: '',
    website: 'https://',
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    gender: '',
    birthday: '',
    organization: '',
    taxIdentifier: '',
    notes: '',
    photo: ''
  })

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
    console.log('isValidForm', isValidForm)
    if (isValidForm) {
      console.log('Call backend saving data')
      const formData = core.formData.set(new FormData(), values)

      const response = await createGuestServerAction(formData)
      console.log(' Test data', response)
      if (response.status === 200) {
      }
    }
  }

  return (
    <div className="w-1/2 ml-8 mb-8">
      <Input label="Photo" name="photo" value={values.photo} onChange={handleChange} required />
      <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.photo}</p>
      <Input
        label="Full name"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
        required
      />
      <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.fullName}</p>

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
      <Input label="Gender" name="gender" value={values.gender} onChange={handleChange} required />
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
      <label>Notes:</label>
      <p>
        <textarea value={values.notes} name="notes" onChange={handleChange} required />
      </p>
      <Button color="secondary" onClick={handleSubmit} shape="circle">
        Save
      </Button>
    </div>
  )
}

export default CreateGuestForm

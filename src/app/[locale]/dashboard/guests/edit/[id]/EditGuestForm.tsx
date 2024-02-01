'use client'
import { FC, useState, ChangeEvent } from 'react'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import Button from '~/components/Button'
import Input from '~components/Input'
import TextArea from '~/components/TextArea'
import { editServerAction } from '~/app/actions/dashboard/guest'


type Props = {
  data: any
}

const EditGuestForm: FC<any> = ({data:{id, businessId, fullName,email, phone,website, facebook, instagram, gender, birthday, organization, taxIdentifier, notes, photo }}) => {
  const [values, setValues] = useState({
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
    if (isValidForm) {
      const formData = core.formData.set(new FormData(), values)

     const response = await editServerAction(formData)
     if (response.status === 200) {
      }
    }
  }

  return (
    <div className="w-1/2 ml-8 mb-8">
      <Input label="Photo" name="photo" value={values.photo} onChange={handleChange} required />
      <p className="text-red-500 mb-4 text-xs ml-4 break-words"></p>
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

      <TextArea label="Notes" value={values.notes} name="notes" onChange={handleChange} required />

      <Button color="secondary" onClick={handleSubmit} shape="circle">
        Save
      </Button>
    </div>
  )
}

export default EditGuestForm

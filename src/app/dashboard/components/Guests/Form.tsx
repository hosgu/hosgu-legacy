'use client'
import { FC, useState } from 'react'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import { RenderIf } from '@architecturex/components.renderif'

import File from '~/components/File'
// TODO: Move this to @architecturex/utils.files
import { deleteFile, uploadFile, getSelectedFile } from '~/app/shared/filesUtils'
import * as GuestActions from '~/app/shared/actions/guest'
import Notification from '~/components/Notification'
import Button from '~/components/Button'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'

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
  const [file, setFile] = useState<any>({})
  const [fileUrl, setFileUrl] = useState('')
  const [filename, setFilename] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>({})
  const [deletedFile, setDeletedFile] = useState<any>('')
  const [isUploaded, setIsUploaded] = useState(false)

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

  const handleSelectedFile = async (e: any) => {
    const { file: _file, fileName: name, fileUrl: _fileUrl } = await getSelectedFile(e)

    setFile(_file)
    setFilename(name)
    setFileUrl(_fileUrl)
    setSelectedFile(_file)
    console.log('_file', _file)
    console.log('NAME===>', name)
    onUploadFile(_file, _fileUrl)
  }

  const onUploadFile = async (currentFile: any, url: string) => {
    const [, , , _fileUrl] = url.split('/')
    console.log('FILE URL==>>>', _fileUrl)
    await uploadFile(currentFile, `/api/v1/uploader/${_fileUrl}`)
    setIsUploaded(true)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      if (selectedFile && selectedFile.name) {
        formData.append('photo', selectedFile.name)
      }

      if (deletedFile) {
        await deleteFile(deletedFile)
      }

      const response =
        action === 'save'
          ? await GuestActions.create(formData)
          : await GuestActions.update(formData)

      if (response.status === 200) {
        setShowNotification(true)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RenderIf isTrue={showNotification}>
        <Notification
          message={action == 'save' ? 'Guest saved successfully' : 'Guest edited successfully'}
          type="success"
        />
      </RenderIf>

      <RenderIf isTrue={action === 'edit'}>
        <input type="hidden" name="id" value={initialValues.id} />
      </RenderIf>

      <input type="hidden" name="businessId" value={initialValues.businessId} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <RenderIf isTrue={isUploaded}>
            <img src={`/files/images/${filename}`} alt="Uploaded file" width={200} />
          </RenderIf>

          <File
            name="fileName"
            selectedFile={selectedFile}
            label="chooseFile"
            onChange={handleSelectedFile}
            maxFileSize={52000000}
            allowedExtensions={['png', 'jpg', 'jpeg']}
            onUpload={onUploadFile}
          />
        </div>

        <div>
          <Input
            defaultValue={fullName}
            label="Full name"
            name="fullName"
            className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
            required
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.fullName}</p>
        </div>

        <div>
          <Input
            defaultValue={email}
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
            defaultValue={phone}
            label="Phone"
            name="phone"
            placeholder="+1 999 999 9999"
            required
            className={errors.phone ? 'border-red-500 dark:border-red-500' : ''}
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.phone}</p>
        </div>

        <Input defaultValue={website} label="Website" name="website" />

        <Input defaultValue={facebook} label="Facebook" name="facebook" />

        <Input defaultValue={instagram} label="Instagram" name="instagram" />

        <Input defaultValue={gender} label="Gender" name="gender" />
        <Input
          defaultValue={birthday}
          label="Birthday"
          name="birthday"
          placeholder="MM/DD/YYYY"
          required
        />
        <Input defaultValue={organization} label="Organization" name="organization" />
        <Input defaultValue={taxIdentifier} label="Tax Identifier" name="taxIdentifier" />

        <TextArea defaultValue={notes} label="Notes" name="notes" />
      </div>
      <div className="flex justify-center">
        <Button type="submit" shape="square" size="large" fullWidth>
          Save
        </Button>
      </div>
    </form>
  )
}

export default Form

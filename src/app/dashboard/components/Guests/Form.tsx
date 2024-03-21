'use client'
import { FC, useEffect, useState } from 'react'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import { RenderIf } from '@architecturex/components.renderif'

import File from '~/components/File'
// TODO: Move this to @architecturex/utils.files
// TODO: Clean states after closing modal, do not alter backend
import {
  deleteFile,
  uploadFile,
  getSelectedFile,
  findFileByAction,
  fileStatusActions,
  getFileNameFromUrl
} from '~/app/shared/filesUtils'
import * as GuestActions from '~/app/shared/actions/guest'
import Notification from '~/components/Notification'
import Button from '~/components/Button'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'

type Props = {
  action: 'save' | 'edit'
  data?: any
  fileStatus: any
  setFileStatus: any
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
  action = 'save',
  fileStatus,
  setFileStatus
}) => {
  const [file, setFile] = useState<any>({})
  const [fileUrl, setFileUrl] = useState('')
  const [filename, setFilename] = useState(photo)
  const [selectedFile, setSelectedFile] = useState<any>({})
  const [deletedFile, setDeletedFile] = useState<any>('')
  const [isUploaded, setIsUploaded] = useState(false)
  const displayedPhoto =
    findFileByAction(fileStatus, 'upload')?.url || findFileByAction(fileStatus, 'show')?.url

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
    onUploadFile(_file, _fileUrl)
  }

  const handleDeleteFile = async () => {
    setDeletedFile(filename.split('/').pop())
    setFile({})
    setFileUrl('')
    setFilename('')
    setSelectedFile({})
  }

  const onUploadFile = async (currentFile: any, url: string) => {
    const fileName = getFileNameFromUrl(url)
    const apiEndPoint = `/api/v1/uploader/${fileName}`
    await uploadFile(currentFile, apiEndPoint)
    setIsUploaded(true)
    setFileStatus((prev: any) => [
      ...markImagesToDelete(prev),
      { url: `/files/images/${fileName}`, action: 'upload' }
    ])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      let { fileStack } = await fileStatusActions([...fileStatus], deleteFile, 'save')
      const [finalFile] = fileStack
      setFileStatus([...fileStack])

      formData.append('photo', '')

      if (finalFile.url) {
        formData.set('photo', finalFile.url)
      } else if (photo) {
        formData.set('photo', photo)
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

  const handleRemoveImage = () => {
    setFileStatus((prev: any) => markImagesToDelete(prev))
  }

  const markImagesToDelete = (imagesArray: any) => {
    return imagesArray.map((image: any) => {
      if (image.action !== 'show' && image.action !== 'pending') {
        return { ...image, action: 'delete' }
      } else {
        return { ...image, action: 'pending' }
      }
    })
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
        <div className="p-4">
          <RenderIf isTrue={isUploaded || action == 'edit'}>
            <RenderIf isTrue={!!displayedPhoto}>
              <img src={displayedPhoto} alt="Uploaded file" />
            </RenderIf>
            <RenderIf isTrue={!!displayedPhoto}>
              <Button className="button" onClick={handleRemoveImage}>
                Remove image
              </Button>
            </RenderIf>
          </RenderIf>
          <div>
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
        </div>
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

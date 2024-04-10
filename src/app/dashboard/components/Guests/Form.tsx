'use client'
import { FC, useEffect, useState } from 'react'
import is from '@architecturex/utils.is'
import core from '@architecturex/utils.core'
import { RenderIf } from '@architecturex/components.renderif'
import { default as fileUtils } from '@architecturex/utils.files'
import files from '@architecturex/utils.files'

import File from '~/components/File'
import FilesPreviewer from '~/components/FilesPreviewer'
import * as GuestActions from '~/app/shared/actions/guest'
import Notification from '~/components/Notification'
import Button from '~/components/Button'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'

// TODO: Move to config
const config = {
  files: {
    extensions: {
      images: {
        'image/jpeg': ['jpeg', 'jpg'],
        'image/png': ['png']
      },
      docs: {
        pdf: 'application/pdf'
      }
    }
  }
}

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
  const [selectedFile, setSelectedFile] = useState<any>({})
  const [isUploaded, setIsUploaded] = useState(false)
  const displayedPhoto =
    fileUtils.findFileByAction(fileStatus, 'upload')?.url ||
    fileUtils.findFileByAction(fileStatus, 'show')?.url

  // 🧪 Test
  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  useEffect(() => {
    console.log('🪄 Uploaded files', uploadedFiles)
  }, [uploadedFiles])

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
      let { fileStack } = await fileUtils.fileStatusActions([...fileStatus], fileUtils.deleteFile)
      const [finalFile] = fileStack
      setFileStatus([...fileStack])

      formData.append('photo', '')

      if (finalFile && finalFile.url) {
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

  const handleSubmitTest = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      const fileList = uploadedFiles.map((file: any) => file)
      console.log('fileList 👉🏼', fileList)

      const uploadFilesResponse = await files.uploadFiles(
        fileList,
        '/api/v1/uploader?setType=image'
      )
      console.log('Upload files response', uploadFilesResponse)

      if (uploadedFiles.length == 1 && uploadFilesResponse.ok) {
        const fileName = uploadFilesResponse.data[0].filename
        console.log('👉🏼Uploaded files', uploadedFiles)
        const url = `/files/images/${fileName}`
        formData.append('photo', url)
      }

      if ('') {
        // formData.set('photo', finalFile.url)
      } else if (photo) {
        // formData.set('photo', photo)
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
      let action = image.action !== 'pending' ? 'delete' : 'pending'
      if (image.action === 'show') {
        action = 'pending'
      }
      return { ...image, action }
    })
  }

  return (
    <form onSubmit={handleSubmitTest}>
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
            {/* TODO:
                - Handle Allowed extensions ✔️
                - Handle max file size
                - Handle file preview
                - Handle file list
                - Document directory
                - Limit maximum drag files
            */}
            <File
              name="fileName"
              label="Drag your photo here"
              maxFileSize={52000000}
              allowedSetType="image"
              allowedFiles={config.files.extensions.images}
              setUploadedFiles={setUploadedFiles}
              displayDragArea={uploadedFiles.length === 0}
            />
            <FilesPreviewer files={uploadedFiles} setFiles={setUploadedFiles} />
          </div>
        </div>
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

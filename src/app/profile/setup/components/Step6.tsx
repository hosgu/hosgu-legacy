'use client'
import React, { FC, useState, useEffect } from 'react'
import File from '~/components/File'
import FilesPreviewer from '~/components/FilesPreviewer'
import Modal from '~/components/Modal'
import config from '~/config'
import i18n from '~/app/shared/contexts/server/I18nContext'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  uploadedFiles: any
  setUploadedFiles: any
}

const Step: FC<Props> = ({ locale, uploadedFiles, setUploadedFiles }) => {
  const [isUploadPhotosOpen, setIsUploadPhotosOpen] = useState(true)
  const t = i18n(locale)

  const getFileNameFromUrl = (url: string) => {
    const fileName = url.split('/').pop()
    return fileName ? fileName : ''
  }

  useEffect(() => {
    if (uploadedFiles.length > 1) {
      setIsUploadPhotosOpen(false)
    }
  }, [uploadedFiles])

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className="flex flex-col  space items-center text-center w-full  h-full overflow-y-auto "
    >
      <div className="w-[50vw] flex justify-center flex-col items-center h-auto ">
        <div className="w-full mt-3 h-auto">
          <Modal
            isModalOpen={isUploadPhotosOpen}
            onClose={() => {
              setIsUploadPhotosOpen(false)
            }}
            title={t('profile.setup.step6.uploadPhotos')}
            removeBackground={true}
          >
            <File
              name="fileName"
              label={
                uploadedFiles.length === 0
                  ? t('profile.setup.step6.dragYourPhoto')
                  : t('profile.setup.step6.addMorePhotos')
              }
              maxFileSize={52000000}
              multiple
              allowedFiles={config.files.extensions.images}
              setUploadedFiles={setUploadedFiles}
            />
          </Modal>
        </div>

        <FilesPreviewer
          files={uploadedFiles}
          setFiles={setUploadedFiles}
          isUploadPhotosOpen={isUploadPhotosOpen}
          setIsUploadPhotosOpen={setIsUploadPhotosOpen}
        />
      </div>
    </div>
  )
}

export default Step

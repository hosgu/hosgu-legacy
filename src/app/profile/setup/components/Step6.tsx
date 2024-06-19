'use client'
import React, { FC, useState, useEffect } from 'react'
import File from '~/components/File'
import FilesPreviewer from '~/components/FilesPreviewer'
import Modal from '~/components/Modal'
import config from '~/config'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  uploadedFiles: any
  setUploadedFiles: any
}

const Step: FC<Props> = ({ uploadedFiles, setUploadedFiles }) => {
  const [isUploadPhotosOpen, setIsUploadPhotosOpen] = useState(true)

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
            title="Upload your Photos"
            removeBackground={true}
          >
            <File
              name="fileName"
              label={uploadedFiles.length === 0 ? 'Drag your photo here' : 'Add more photos'}
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

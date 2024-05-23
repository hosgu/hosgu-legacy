'use client'
import React, { FC, useState } from 'react'
import File from '~/components/File'
import FilesPreviewer from '~/components/FilesPreviewer'
import Modal from '~/components/Modal'
import config from '~/config'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  values: any
  setValues: any
  uploadedFiles: any
  setUploadedFiles: any
}
type Image = File // Define an interface for Image type

const Step: FC<Props> = ({ uploadedFiles, setUploadedFiles, values, setValues }) => {
  const [isUploadPhotosOpen, setIsUploadPhotosOpen] = useState(true)

  const onUploadFile = async (currentFile: any, url: string) => {
    console.log('📦 onUploadFile', { currentFile, url })
    const fileName = getFileNameFromUrl(url)
    const apiEndPoint = `/api/v1/uploader/${fileName}`
  }

  const getFileNameFromUrl = (url: string) => {
    const fileName = url.split('/').pop()
    return fileName ? fileName : ''
  }

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className="flex flex-col  space items-center text-center w-full  h-[650px] overflow-y-auto "
    >
      <h1>Fotos</h1>
      <div className="w-[50vw] flex justify-center flex-col items-center h-auto ">
        <div className="w-full mt-3 h-auto">
          <Modal
            isModalOpen={isUploadPhotosOpen}
            onClose={() => {
              setIsUploadPhotosOpen(false)
            }}
            title="Upload your Photos"
            isfullScreen={false}
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
        <div>
          <FilesPreviewer files={uploadedFiles} setFiles={setUploadedFiles} />
        </div>
      </div>
    </div>
  )
}

export default Step

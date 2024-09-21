import React, { FC } from 'react'
import { RenderIf } from '@architecturex/components.renderif'
import SVG from '@architecturex/components.svg'
import i18n from '~/app/core/contexts/server/I18nContext'

type Props = {
  locale?: string
  files: any[]
  setFiles: React.Dispatch<React.SetStateAction<string[]>>
  showUploader?: boolean
  isUploadPhotosOpen?: boolean
  setIsUploadPhotosOpen?: (event: any) => any
}

const FilesPreviewer: FC<Props> = ({
  locale,
  files,
  setFiles,
  isUploadPhotosOpen,
  setIsUploadPhotosOpen
}) => {
  const t = i18n(locale)

  const handleRemoveImage = async (e: any) => {
    const fileName = e.target.dataset.filename

    const fileList = files.filter((file: any) => {
      return file.file.name !== fileName
    })

    setFiles(fileList)
  }

  const handleAddPhotos = () => {
    if (setIsUploadPhotosOpen) {
      setIsUploadPhotosOpen(true)
    }
  }

  const imageFiles = files.filter((file: any) => file.file?.type.split('/').shift() === 'image')

  const button = (
    <RenderIf isFalse={isUploadPhotosOpen}>
      <div
        onClick={handleAddPhotos}
        className="dark:border-gray-200 p-4 border-gray-300 border-2 border-dashed rounded w-full flex flex-col items-center justify-center h-48 sm:h-48 md:h-56 lg:h-64 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="flex flex-col items-center">
          <SVG.Plus size="50px" />
          <span className="mt-2 text-sm">{t('profile.setup.step6.addMorePhotos')}</span>
        </div>
      </div>
    </RenderIf>
  )

  return (
    <div className="w-full mx-auto">
      {imageFiles.length > 0 && (
        <div className="w-full h-64 sm:h-64 md:h-80 lg:h-96 mb-4">
          <div className="relative w-full h-full">
            <div
              title="Remove photo"
              onClick={handleRemoveImage}
              data-filename={imageFiles[0].file?.name}
              className="absolute bg-black w-6 h-6 right-3 top-2 text-center text-white font-bold hover:text-gray-200 hover:cursor-pointer"
            >
              X
            </div>
            <img
              src={imageFiles[0].url || imageFiles[0].base64}
              alt={imageFiles[0].file?.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageFiles.slice(1).map((file: any) => (
          <div key={file.file.name} className="w-full h-48 sm:h-48 md:h-56 lg:h-64 relative">
            <div
              title="Remove photo"
              onClick={handleRemoveImage}
              data-filename={file.file?.name}
              className="absolute bg-black w-6 h-6 right-3 top-2 text-center text-white font-bold hover:text-gray-200 hover:cursor-pointer"
            >
              X
            </div>
            <img
              src={file.url || file.base64}
              alt={file.file?.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
        {button}
      </div>
    </div>
  )
}

export default FilesPreviewer

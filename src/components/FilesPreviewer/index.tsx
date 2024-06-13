import React, { FC } from 'react'
import { RenderIf } from '@architecturex/components.renderif'
import SVG from '@architecturex/components.svg'
import cx from '@architecturex/utils.cx'

type Props = {
  files: any[]
  setFiles: React.Dispatch<React.SetStateAction<string[]>>
  showUploader?: boolean
  isUploadPhotosOpen: boolean
  setIsUploadPhotosOpen: (event: any) => any
}

const FilesPreviewer: FC<Props> = ({
  files,
  setFiles,
  isUploadPhotosOpen,
  setIsUploadPhotosOpen
}) => {
  const handleRemoveImage = async (e: any) => {
    const fileName = e.target.dataset.filename

    const fileList = files.filter((file: any) => {
      return file.file.name !== fileName
    })

    setFiles(fileList)
  }

  const handleAddPhotos = () => {
    setIsUploadPhotosOpen(true)
  }

  const imageFiles = files.filter((file: any) => file.file?.type.split('/').shift() === 'image')

  const button = (
    <RenderIf isFalse={isUploadPhotosOpen}>
      <div
        onClick={handleAddPhotos}
        className="dark:border-gray-200 p-4 border-gray-300 border-2 border-dashed rounded w-full flex flex-col items-center justify-center h-48 sm:h-48 md:h-56 lg:h-64 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="flex flex-col items-center">
          <SVG.Plus size="50px" className="cursor-pointer" />
          <span className="mt-2 text-sm">Add more photos</span>
        </div>
      </div>
    </RenderIf>
  )

  const gridImages = imageFiles.map((file: any, index: number) => {
    return (
      <div key={file.file.name} className="w-full relative h-48 sm:h-48 md:h-56 lg:h-64">
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
    )
  })

  gridImages.push(button)

  return (
    <div
      className={cx.join(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8 w-full mx-auto'
      )}
    >
      {gridImages}
    </div>
  )
}

export default FilesPreviewer

import React, { FC } from 'react'
import { RenderIf } from '@architecturex/components.renderif'
import Button from '~/components/Button'
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
      return file.file.name != fileName
    })

    setFiles(fileList)
  }

  const imageFiles = files.filter((file: any) => file.file?.type.split('/').shift() === 'image')

  const button = (
    <RenderIf isFalse={isUploadPhotosOpen}>
      <div className="dark:border-gray-200 p-15 border-gray-300 border-2 border-dashed rounded h-[196px] md:w-[80%] w-full">
        <div className="flex mt-4">
          <SVG.Plus
            size="150px"
            onClick={() => {
              setIsUploadPhotosOpen(true)
            }}
          />
        </div>
      </div>
    </RenderIf>
  )

  const gridImages = imageFiles.map((file: any, index: number) => {
    return (
      <div
        key={file.file.name}
        className={`h-auto w-full relative ${index === 0 && 'col-span-full'}`}
      >
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
          className={cx.join({
            'object-cover': true,
            'w-full': true,
            'h-[196px]': true,
            'col-span-full h-full': index === 0,
            'rounded-md': true
          })}
        />
      </div>
    )
  })

  gridImages.push(button)

  return (
    <div
      className={cx.join({
        grid: true,
        'w-[130%] lg:w-[600px]': true,
        'h-[130%] lg:h-[600px]': true,
        'justify-items-center': true,
        'grid-cols-1': imageFiles.length == 1,
        'grid-cols-2': imageFiles.length > 1,
        'sm:gap-1 gap-3': true,
        'sm:grid-cols-1 lg:grid-cols-2': true
      })}
    >
      {gridImages}
    </div>
  )
}

export default FilesPreviewer

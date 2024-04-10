import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'

type Props = { files: string[]; setFiles: React.Dispatch<React.SetStateAction<string[]>> }

const FilesPreviewer: FC<Props> = ({ files, setFiles }) => {
  const handleRemoveImage = async (e: any) => {
    const fileName = e.target.dataset.filename

    const fileList = files.filter((file: any) => {
      return file.file.name != fileName
    })

    setFiles(fileList)
  }
  const imageFiles = files.filter((file: any) => file.file.type.split('/').shift() == 'image')
  const gridImages = imageFiles.map((file: any) => {
    return (
      <div key={file.file.name} className="h-full w-full relative">
        <div
          title="Remove photo"
          onClick={handleRemoveImage}
          data-filename={file.file.name}
          className="absolute bg-black w-6 h-6 right-3 top-2 text-center text-white font-bold hover:text-gray-200 hover:cursor-pointer"
        >
          X
        </div>
        <img
          src={file.base64}
          alt={file.file.name}
          className={cx.join({
            'object-cover': true,
            'w-full': true,
            'h-[196px]': true,
            'rounded-md': true
          })}
        />
      </div>
    )
  })

  return (
    <div
      className={cx.join({
        grid: true,
        'justify-items-center': true,
        'grid-cols-1': imageFiles.length == 1,
        'grid-cols-2': imageFiles.length > 1,
        'gap-3': true,
        'lg:grid-cols-3': true
      })}
    >
      {gridImages}
    </div>
  )
}

export default FilesPreviewer

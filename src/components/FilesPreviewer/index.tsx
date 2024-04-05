import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'
import filesUtils from '@architecturex/utils.files'

type Props = { files: string[]; setFiles: React.Dispatch<React.SetStateAction<string[]>> }

const FilesPreviewer: FC<Props> = ({ files, setFiles }) => {
  console.log('FILES', files)

  const imageFiles = files.filter((file: any) => file.mimetype.split('/').shift() == 'image')

  const handleRemoveImage = async (e: any) => {
    const fileName = e.target.dataset.filename
    const isFileDeleted = await filesUtils.deleteFile(fileName)

    if (isFileDeleted) {
      setFiles((prevFiles: string[]) => {
        return prevFiles.filter((file: any) => {
          return !(file.filename == fileName)
        })
      })
    }
  }

  const gridImages = imageFiles.map((imageFile: any) => (
    <div key={imageFile.filename} className="h-full w-full relative">
      <div
        title="Remove photo"
        onClick={handleRemoveImage}
        data-fileName={imageFile.filename}
        className="absolute bg-black w-6 h-6 right-3 top-2 text-center text-white font-bold hover:text-gray-200 hover:cursor-pointer"
      >
        X
      </div>
      <img
        src={`/files/images/${imageFile.filename}`}
        alt={imageFile.filename}
        className={cx.join({
          'object-cover': true,
          'w-full': true,
          'h-[196px]': true,
          'rounded-md': true
        })}
      />
    </div>
  ))

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

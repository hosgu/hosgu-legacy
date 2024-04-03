import React, { FC } from 'react'
import cx from '@architecturex/utils.cx'

type Props = { files: string[] }

const FilesPreviewer: FC<Props> = (props) => {
  const { files } = props
  console.log('FILES', files)

  const imageFiles = files.filter((file: any) => file.mimetype.split('/').shift() == 'image')
  console.log('IMAGES', imageFiles)

  const gridImages = imageFiles.map((imageFile: any) => (
    <div key={imageFile.filename} className="h-full w-full">
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

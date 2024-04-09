import React, { FC, Fragment, useEffect, useRef, useState } from 'react'
import files from '@architecturex/utils.files'
import Image from 'next/image'
import is from '@architecturex/utils.is'
import cx from '@architecturex/utils.cx'

import cloudUploadIcon from '../../../public/images/icons/cloud_upload.svg'

// TODO:
// - Handle Allowed extensions / mimetypes ✔️
// - Handle maximum file size
// - Handle file preview ✔️
// - Limit maximum drag files
// - Optional? Handle invalid extensions / mimetypes (notify user)

const allowedFileTypes = {
  image: config.files.extensions.images,
  document: config.files.extensions.docs,
  all: [...config.files.extensions.images, ...config.files.extensions.docs]
}

type Props = {
  className?: string
  disabled?: boolean
  hasError?: boolean
  id?: string
  name?: string
  setUploadedFiles: React.Dispatch<any>
  noWrapper?: boolean
  onBlur?(e: any): any
  onChange?(e: any): any
  onClick?(e: any): any
  onUpload?: any
  style?: any
  label?: string
  design?: string
  maxFileSize?: number
  allowedFiles: { [mimeType: string]: string[] }
  multiple?: boolean
  displayDragArea?: boolean
}

const File: FC<Props> = ({
  label,
  name = 'file',
  maxFileSize = 12000000,
  allowedFiles,
  multiple,
  setUploadedFiles,
  displayDragArea = true
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropTargetRef = useRef<HTMLDivElement>(null)

  const styleControl = useRef(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const fileExtensions: string[] = Object.values(allowedFiles).flat()
  const fileMimeTypes: string[] = Object.keys(allowedFiles)
  const maxSize = files.bytesToSize(maxFileSize, maxFileSize, true)

  const readFile = (file: File) => {
    const fileReader = new FileReader()

    const handleFileReaderLoad = (e: ProgressEvent<FileReader>) => {
      const base64 = fileReader.result
      if (is(base64).string()) {
        setUploadedFiles((prev: any) => [...prev, { file, base64 }])
      }
      fileReader.removeEventListener('load', handleFileReaderLoad)
    }

    fileReader.addEventListener('load', handleFileReaderLoad)
    fileReader.readAsDataURL(file)
  }

  const handleSelectedFiles = async (fileList: FileList) => {
    const fileListMimeTypes = Array.from(fileList).map((file) => file.type)

    if (isValidMimeTypes(fileListMimeTypes)) {
      const formattedFileList = await files.formatFileList(fileList)
      formattedFileList.map(({ file }) => readFile(file))
    } else {
      // TODO: handle invalid files
    }
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    styleControl.current++
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.dropEffect = 'none'
    const isFiles = e.dataTransfer.types.includes('Files')

    if (isFiles && (multiple || e.dataTransfer.items.length == 1)) {
      const fileMimeTypes = Array.from(e.dataTransfer.items).map((file) => {
        const mimeType = file.type
        return mimeType
      })

      let isValidExtensions: boolean
      if (fileMimeTypes.length == 0) {
        isValidExtensions = true
      } else {
        isValidExtensions = isValidMimeTypes(fileMimeTypes)
      }

      if (isValidExtensions) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
        setIsDragging(true)
      }
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    styleControl.current--

    if (styleControl.current == 0) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    styleControl.current = 0
    handleSelectedFiles(e.dataTransfer.files)
  }

  const isValidMimeTypes = (mimeTypes: string[]) => {
    return mimeTypes.every((mimeType) => {
      if (!mimeType) return false
      return fileMimeTypes.includes(mimeType)
    })
  }

  if (!displayDragArea) {
    return null
  }

  return (
    <div
      ref={dropTargetRef}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cx.join(
        'group border-2 border-dashed rounded select-none transition-all hover:cursor-pointer hover:border-blue-500',
        {
          'border-blue-500': isDragging,
          'border-gray-300': !isDragging
        }
      )}
    >
      <div
        className={cx.join('m-3 p-4 rounded transition-all group-hover:bg-blue-50', {
          'bg-blue-50': isDragging
        })}
      >
        <div className="mb-6 text-center">
          <Image
            src={cloudUploadIcon}
            alt="Image icon"
            width={48}
            className={cx.join('mx-auto mb-1 transition-all group-hover:scale-110', {
              'scale-110': isDragging
            })}
          />
          <p className="mb-2 font-medium">{label ? label : 'Drag your files here'}</p>
          <p className="mb-1 text-xs">
            {fileExtensions.map((extension: any) => extension.toUpperCase()).join(', ')}{' '}
            <span className="text-xs text-gray-500">( {maxSize.size} Max )</span>
          </p>
        </div>
        <div className="relative text-center">
          <label
            htmlFor="file"
            className={cx.join(
              'underline text-xs font-medium transition-all hover:cursor-pointer group-hover:text-blue-500',
              {
                'text-blue-500': isDragging
              }
            )}
          >
            Upload from your device
          </label>
          <input
            ref={inputRef}
            id="file"
            type="file"
            name={name}
            onChange={(e) => (e.target.files ? handleSelectedFiles(e.target.files) : null)}
            accept={fileMimeTypes.map((extension) => extension).join(', ')}
            className="opacity-0 absolute top-0 left-0 w-0 h-0"
            multiple={multiple}
          />
        </div>
      </div>
    </div>
  )
}

export default File

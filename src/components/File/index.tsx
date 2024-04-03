import React, { FC, Fragment, useEffect, useRef, useState } from 'react'
import files from '@architecturex/utils.files'
import Image from 'next/image'

import cloudUploadIcon from '../../../public/images/icons/cloud_upload.svg'

const config = {
  files: {
    extensions: {
      images: ['jpeg', 'jpg', 'png'],
      docs: ['pdf']
    }
  }
}

type Props = {
  className?: string
  disabled?: boolean
  hasError?: boolean
  id?: string
  name?: string
  setUploadedFiles: React.Dispatch<string[]>
  noWrapper?: boolean
  onBlur?(e: any): any
  onChange?(e: any): any
  onClick?(e: any): any
  onUpload?: any
  style?: any
  label?: string
  design?: string
  selectedFile?: any
  maxFileSize?: number
  allowedExtensions?: string[]
  allowedSetType: 'image' | 'document' | 'all'
  multiple?: boolean
}

const File: FC<Props> = (props) => {
  const {
    label,
    name = 'file',
    selectedFile = {},
    maxFileSize = 12000000,
    allowedSetType = 'all',
    allowedExtensions = ['all'],
    multiple,
    setUploadedFiles
  } = props

  const dropTarget = useRef<HTMLDivElement>(null)
  const dropIcon = useRef<HTMLImageElement>(null)
  let dragTargetStyleControl = 0

  const allowedFileTypes = {
    image: config.files.extensions.images,
    document: config.files.extensions.docs,
    all: [...config.files.extensions.images, ...config.files.extensions.docs]
  }

  const file = files.bytesToSize(selectedFile.size, maxFileSize)
  const maxSize = files.bytesToSize(maxFileSize, maxFileSize, true)
  const { fileName, extension } = files.getFileNameAndExtension(selectedFile.name)
  const isAllowedExt = allowedExtensions.includes(extension) || allowedExtensions.includes('all')

  const handleSelectedFiles = async (fileList: FileList) => {
    const formattedFileList = await files.formatFileList(fileList)
    const uploadFilesResponse = await files.uploadFiles(
      formattedFileList,
      `/api/v1/uploader?setType=${allowedSetType}`
    )
    console.log('Upload files response', uploadFilesResponse)

    if (uploadFilesResponse.ok) {
      setUploadedFiles(uploadFilesResponse.data)
    }
  }

  const handleDropTargetStyle = (isAllowed: boolean) => {
    if (!dropTarget.current || !dropIcon.current) {
      return
    }

    const styles = {
      dropTarget: ['bg-blue-100', 'border-blue-300'],
      dropIcon: ['scale-110']
    }

    if (isAllowed) {
      dropTarget.current.classList.add(...styles.dropTarget)
      dropIcon.current.classList.add(...styles.dropIcon)
    } else {
      dropTarget.current.classList.remove(...styles.dropTarget)
      dropIcon.current.classList.remove(...styles.dropIcon)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragTargetStyleControl++
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const isFiles = e.dataTransfer.types.includes('Files')

    if (isFiles && (multiple || e.dataTransfer.items.length == 1)) {
      const fileExtensions = Array.from(e.dataTransfer.items).map((file) =>
        file.type.split('/').pop()
      )

      const isValidExtensions = fileExtensions.every((extension: any) => {
        return allowedFileTypes[allowedSetType].includes(extension)
      })

      if (isValidExtensions) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
        handleDropTargetStyle(true)
      } else {
        e.dataTransfer.dropEffect = 'none'
      }
    } else {
      e.dataTransfer.dropEffect = 'none'
    }
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    dragTargetStyleControl--

    if (dropTarget.current && dragTargetStyleControl == 0) {
      handleDropTargetStyle(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragTargetStyleControl = 0

    if (dropTarget.current) {
      handleSelectedFiles(e.dataTransfer.files)
      handleDropTargetStyle(false)
    }
  }

  return (
    <>
      <div
        id="droptarget"
        ref={dropTarget}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="p-8 border-2 border-dashed border-gray-300 rounded select-none transition-all"
      >
        <div className="mb-6 text-center">
          <Image
            ref={dropIcon}
            src={cloudUploadIcon}
            alt="Image icon"
            width={48}
            className="mx-auto mb-1"
          />
          <p className="mb-2 font-medium">{label ? label : 'Drag your files here'}</p>
          <p className="mb-1 text-xs">
            {allowedExtensions.map((extension) => extension.toUpperCase()).join(', ')}{' '}
            <span className="text-xs text-gray-500">( {maxSize.size} Max )</span>
          </p>
        </div>
        <div className="relative text-center">
          <label
            htmlFor="file"
            className="underline text-xs font-medium cursor-pointer hover:text-gray-500"
          >
            Upload from your device
          </label>
          <input
            type="file"
            name={name}
            id="file"
            onChange={(e) => (e.target.files ? handleSelectedFiles(e.target.files) : null)}
            accept={allowedExtensions
              .map((extension) => (extension.includes('.') ? extension : '.'.concat(extension)))
              .join(', ')}
            className="opacity-0 absolute top-0 left-0 w-0 h-0"
            {...props}
          />
        </div>
      </div>

      {/* <div className="-mt-10">
        <br />
        {selectedFile.name && (
          <div className="text-gray-500 text-xs mt-2">
            {fileName}.
            {isAllowedExt ? (
              <div className="text-green-500">{extension}</div>
            ) : (
              <div className="text-red-500">{extension}</div>
            )}{' '}
            (<span style={{ color: file.allowed ? 'green' : 'red' }}>{file.size}</span>)
          </div>
        )}

        <span className="text-gray-300 text-xs mt-1">
          <strong>Max File Size is:</strong> {maxSize.size}
        </span>
        <br />
        <span className="text-gray-300 text-xs mt-1">
          <strong>Allowed extensions:</strong>{' '}
          {allowedExtensions.map((ext: string, index: number) => (
            <Fragment key={`file-${index}`}>
              {ext === extension ? isAllowedExt ? <div>{ext}</div> : <div>{ext}</div> : ext}
              {index < allowedExtensions.length - 1 ? ', ' : ''}
            </Fragment>
          ))}
        </span>
      </div> */}
    </>
  )
}

export default File

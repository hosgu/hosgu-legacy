import React, { FC, Fragment, useEffect, useRef } from 'react'
import files from '@architecturex/utils.files'
import Image from 'next/image'
import imageIcon from '../../../public/images/icons/image.svg'

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
  multiple?: boolean
}

const File: FC<Props> = (props) => {
  const {
    label,
    name = 'file',
    selectedFile = {},
    maxFileSize = 12000000,
    allowedExtensions = ['all'],
    setUploadedFiles
  } = props

  const dropTarget = useRef<HTMLDivElement>(null)
  let dragTargetStyleControl = 0

  const file = files.bytesToSize(selectedFile.size, maxFileSize)
  const maxSize = files.bytesToSize(maxFileSize, maxFileSize, true)
  const { fileName, extension } = files.getFileNameAndExtension(selectedFile.name)
  const isAllowedExt = allowedExtensions.includes(extension) || allowedExtensions.includes('all')

  const handleSelectedFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files

    if (fileList) {
      const formattedFileList = await files.formatFileList(fileList)
      const uploadFilesResponse = await files.uploadFiles(formattedFileList, '/api/v1/uploader')
      console.log('formattedFileList response', uploadFilesResponse)
      if (uploadFilesResponse.ok) {
        setUploadedFiles(uploadFilesResponse.data)
      }
    }
  }

  const handleDropTargetStyle = (dropTarget: HTMLDivElement, isActive: boolean) => {
    if (isActive) {
      dropTarget.classList.add('bg-gray-100')
    } else {
      dropTarget.classList.remove('bg-gray-100')
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragTargetStyleControl++

    if (e.target == dropTarget.current) {
      handleDropTargetStyle(dropTarget.current, true)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragTargetStyleControl--

    if (e.target == dropTarget.current && dragTargetStyleControl == 0) {
      handleDropTargetStyle(dropTarget.current, false)
    }
  }

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    dragTargetStyleControl = 0

    if (dropTarget.current) {
      handleDropTargetStyle(dropTarget.current, false)
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
        onDrop={handleDragDrop}
        className="p-8 border border-dashed border-gray-400 rounded select-none"
      >
        <div className="mb-8">
          <Image src={imageIcon} alt="Image icon" width={40} className="mx-auto mb-4" />
          <p className="font-medium text-center">Drag your photo here</p>
        </div>
        <div className="relative text-center">
          <label htmlFor="file" className="underline text-xs cursor-pointer">
            Upload from your device
          </label>
          <input
            type="file"
            name={name}
            id="file"
            onChange={handleSelectedFiles}
            accept={allowedExtensions
              .map((extension) => (extension.includes('.') ? extension : '.'.concat(extension)))
              .join(',')}
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

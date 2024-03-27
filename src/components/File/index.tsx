import React, { FC, Fragment } from 'react'
import Button from '../Button'
import files from '@architecturex/utils.files'

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
    allowedExtensions = ['all']
  } = props

  const file = files.bytesToSize(selectedFile.size, maxFileSize)
  const maxSize = files.bytesToSize(maxFileSize, maxFileSize, true)
  const { fileName, extension } = files.getFileNameAndExtension(selectedFile.name)
  const isAllowedExt = allowedExtensions.includes(extension) || allowedExtensions.includes('all')

  const handleSelectedFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    console.log('File list', fileList)

    if (fileList) {
      const formattedFileList = await files.formatFileList(fileList)
      const response = await files.uploadFiles(formattedFileList, '/api/v1/uploader')
      console.log('⚡FormatterFileList response', response)
    }
  }

  return (
    <>
      <div className="File flex flex-start mt-1 mb-5">
        <div>
          <div
            className="h-10 overflow-hidden relative cursor-pointer mr-3"
            title={`Max File Size is ${maxSize.size}`}
          >
            <Button className="button">{label}</Button>
            <input
              type="file"
              name={name}
              id="file"
              onChange={handleSelectedFiles}
              style={{
                fontSize: '200px',
                cursor: 'pointer',
                opacity: 0,
                position: 'absolute',
                right: 0,
                top: 0
              }}
              {...props}
            />
          </div>
        </div>
      </div>

      <div className="-mt-10">
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
      </div>
    </>
  )
}

export default File

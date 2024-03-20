import security from '@architecturex/utils.security'
import slug from '@architecturex/utils.slug'

export function getFileInfo(file: any): any {
  if (!file) {
    return {
      fileName: '',
      extension: ''
    }
  }

  const parts = file.split('.')
  const extension = parts.pop()
  const fileName = parts.pop()

  return {
    fileName,
    extension: extension.toLowerCase()
  }
}

export function bytesToSize(bytes: any, maxFileSize: number, round?: boolean): any {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  let allowed = true

  if (bytes > maxFileSize) {
    allowed = false
  }

  const n = Number(bytes)

  // @ts-ignore
  const i = parseInt(Math.floor(Math.log(n) / Math.log(1024)), 10)

  if (i === 0) {
    return `${bytes} ${sizes[i]}`
  }

  let size: any = (bytes / 1024 ** i).toFixed(1)

  if (round) {
    size = Math.ceil(size)
  }

  return {
    size: `${size} ${sizes[i]}`,
    allowed
  }
}

export function getFileExtensionFromURL(fileUrl = ''): any {
  let file: any = ''

  if (fileUrl) {
    file = fileUrl.split('/').pop()
  }

  return getFileInfo(file)
}

export function getImageData(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.src = window.URL.createObjectURL(file)
    img.onload = (): any => resolve({ width: img.width, height: img.height })
    img.onerror = reject
  })
}

export async function uploadFile(file: any, url: string): Promise<boolean> {
  if (!file) {
    return false
  }

  const fileData: any = new FormData()
  fileData.append('file', file)

  const response = await fetch(url, {
    method: 'POST',
    body: fileData
  })

  const responseData = await response.json()

  if (responseData.destination) {
    return true
  }

  return false
}

export async function deleteFile(file: string): Promise<boolean> {
  if (!file) {
    return false
  }

  const response = await fetch(`/api/v1/uploader/${file}`, {
    method: 'DELETE'
  })

  const responseData = await response.json()

  if (responseData) {
    return true
  }

  return false
}

export async function getSelectedFile(e: any): Promise<any> {
  if (e.target.files[0]) {
    const fileData = e.target.files[0]
    const fileSize = bytesToSize(fileData.size, 52000000)
    const { fileName, extension } = getFileInfo(fileData.name)
    const identifier = slug(fileName)
    const code = security.string.code(4)
    const isImage = ['png', 'jpg', 'jpeg'].includes(extension)

    let information = ''
    let url = '/files'

    if (isImage) {
      const img: any = await getImageData(fileData)
      information = `${img.width}x${img.height}px`
      url += '/images'
    }

    return {
      file: fileData,
      fileName: `${identifier}_${code}.${extension}`,
      fileUrl: `${url}/${identifier}_${code}.${extension}`,
      size: fileSize.size,
      information
    }
  }
}

export function findFileByAction(fileStatus: any, action: 'show' | 'delete' | 'upload') {
  return fileStatus.find((image) => image.action == action)
}

export async function fileStatusActions(
  fileStack: any,
  deleteCallback: any,
  actionFrom: 'save' | 'close'
) {
  let fileName

  while (fileStack.length > 1) {
    let currentFileStatus = fileStack.pop()

    if (currentFileStatus) {
      fileName = getFileNameFromUrl(currentFileStatus.url)

      if (currentFileStatus.action === 'delete') {
        // Delete photo from server
        console.log('📦 handleSubmit() - Delete photo - File name:', fileName)
        await deleteCallback(fileName)
      }
      if (currentFileStatus.action === 'upload') {
        // Upload photo to server
        console.log('📦 handleSubmit() - Upload photo')
        currentFileStatus.action = 'show'
        fileStack.unshift(currentFileStatus)
      }
    }
  }
  return { fileStack: [...fileStack], fileName }
}

export function getFileNameFromUrl(url: string) {
  const fileName = url.split('/').pop()
  return fileName ? fileName : ''
}

export async function deleteFilesFromServer(array: any[], deleteCallback: any) {
  console.log('📦 deleteFilesFromServer()', { array, deleteCallback })
  for (let i = 0; i < array.length; i++) {
    const file = array[i]
    const action = file.action
    const fileName = getFileNameFromUrl(file.url)
    if (action === 'delete') {
      await deleteCallback(fileName)
    }
  }
}

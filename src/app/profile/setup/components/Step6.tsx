'use client'
import React, { FC, useState } from 'react'
import Button from '~/components/Button'

type Props = {
  locale: string
  setStep: (prevState: any) => void
  values: any
  setValues: any
}
type Image = File // Define an interface for Image type

const Step: FC<Props> = ({ locale, setStep, values, setValues }) => {
  const { images } = values
  const [selectedImages, setSelectedImages] = useState<Image[]>([])
  const [previews, setPrevies] = useState<string[]>([])
  const [isUploaded, setIsUploaded] = useState(false)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    setSelectedImages([...selectedImages, ...files!]) // Use non-null assertion operator

    if (!window.FileReader) return // Handle lack of FileReader support

    for (let i = 0; i < files!.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(files![i])
      reader.onload = (e) => {
        setPrevies([...previews, e.target?.result as string])
      }
    }
    // Optionally, update a separate state for preview URLs
  }

  const onUploadFile = async (currentFile: any, url: string) => {
    console.log('📦 onUploadFile', { currentFile, url })
    const fileName = getFileNameFromUrl(url)
    const apiEndPoint = `/api/v1/uploader/${fileName}`
    setIsUploaded(true)
  }

  const getFileNameFromUrl = (url: string) => {
    const fileName = url.split('/').pop()
    return fileName ? fileName : ''
  }

  const onSave = () => {
    selectedImages.forEach((img: any) => {
      console.log(img)
    })
  }

  return (
    <div className="flex flex-col justify-between space items-center text-center w-full h-[60vh] ">
      <h1>Fotos</h1>
      <input
        type="file"
        accept="image/*" // Restrict file types to images if desired
        multiple
        onChange={handleImageChange}
        className=" h-12 mb-2"
      />

      <div className="w-[50vw] h-full bg-gray-200 flex justify-center  items-center overflow-scroll">
        <div className="w-full h-full flex  justify-center ">
          <div className="flex flex-row m-auto justify-center flex-wrap">
            {previews?.map((url: any) => (
              <img
                className="w-1/4 h-auto mx-2 my-2 rounded-xl hover:scale-110 shadow-2xl  hover:shadow-slate-900 transition"
                src={url}
                alt="Preview"
                key={url}
              />
            ))}
          </div>
        </div>
      </div>
      <Button onClick={onSave}>Upload</Button>
    </div>
  )
}

export default Step

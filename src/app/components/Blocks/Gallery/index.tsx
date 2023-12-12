import React, { FC } from 'react'
import Image from 'next/image'

const galleryData = [
  '/photos/1.jpg',
  '/photos/2.jpg',
  '/photos/3.jpg',
  '/photos/4.jpg',
  '/photos/5.jpg',
  '/photos/6.jpg'
]

const Gallery: FC = () => (
  <div
    data-component="Gallery"
    className="flex flex-wrap -mx-2 overflow-hidden sm:-mx-2 md:-mx-2 lg:-mx-2 xl:-mx-2"
  >
    {galleryData.map((photo, index) => (
      <div key={index} className="w-1/2">
        <Image src={photo} alt={`Cabin Photo ${index + 1}`} width={1000} height={700} />
      </div>
    ))}
  </div>
)

export default Gallery

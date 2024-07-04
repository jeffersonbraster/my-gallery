"use client"

import { usePathname, useRouter } from 'next/navigation'
import useKeypress from 'react-use-keypress'
import { CldImage } from 'next-cloudinary'
import SharedModal from './shared-modal'
import Modal from './modal'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '@/utils/use-last-viewed-photo'

export default function Carousel({
  index,
  currentPhoto,
  images
}: {
  index: number
  currentPhoto: ImageProps
  images: ImageProps[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const photoId = pathname.split('/')[2]

  const [, setLastViewedPhoto] = useLastViewedPhoto()

  function closeModal() {
    setLastViewedPhoto(currentPhoto.id)
    router.push('/')
  }

  function changePhotoId(newVal: number) {
    return newVal
  }

  useKeypress('Escape', () => {
    closeModal()
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
        onClick={closeModal}
      >
        <CldImage
          src={currentPhoto.blurDataUrl!}
          className="pointer-events-none h-full w-full"
          alt="blurred background"
          fill
          priority
        />
      </button>
      <SharedModal
        index={index}
        changePhotoId={changePhotoId}
        currentPhoto={currentPhoto}
        closeModal={closeModal}
        navigation={false}
      />

      {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
            photoId={photoId}
          />
      )}
    </div>
  )
}

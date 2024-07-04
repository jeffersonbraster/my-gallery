'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Masonry } from 'react-plock'
import MainCard from '@/components/main-card'
import ImageCard from '@/components/image-card'
import { useLastViewedPhoto } from '@/utils/use-last-viewed-photo'
import { INITIAL_LOAD_COUNT } from '@/utils/constants'
import { ImageProps } from "@/utils/types";
import Modal from './modal'
import Menu from './menu'

const GridCards = ({
  images,
  folders
}: {
  images: ImageProps[]
  folders: string[]
}) => {
  console.log(folders)
  const searchParams = useSearchParams()
  const photoId = searchParams.get('photoId') as string | string[]
  const [data, setData] = useState(images)
  const [selectedFolder, setSelectedFolder] = useState('All')
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const [visibleImages, setVisibleImages] = useState<any[]>([])

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const initialVisibleImages = data.slice(0, INITIAL_LOAD_COUNT)
    setVisibleImages(initialVisibleImages)
  }, [data])

  useEffect(() => {
    setData(
      images.filter(({ folder }) =>
        selectedFolder === 'All' ? true : folder === selectedFolder
      )
    )
  }, [images, selectedFolder])

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef?.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
      {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
      )}

      <Masonry
        items={visibleImages}
        config={{
          columns: [1, 2, 3, 4],
          gap: [16, 16, 16, 16],
          media: [640, 980, 1280, 1536]
        }}
        render={({ id, public_id, blurDataUrl, width, height }, index) => {
          return (
            <React.Fragment key={id}>
              {index === 0 && visibleImages[0].id === id && <MainCard />}
              <ImageCard
                key={id}
                id={id}
                public_id={public_id}
                blurDataUrl={blurDataUrl}
                width={width}
                height={height}
                lastViewedPhoto={lastViewedPhoto}
                lastViewedPhotoRef={lastViewedPhotoRef}
              />
            </React.Fragment>
          )
        }}
      />

      <Menu
        folders={folders}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
    </>
  )
}

export default GridCards

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Masonry } from 'react-plock'
import Menu from '@/components/menu'
import MainCard from '@/components/main-card'
import ImageCard from '@/components/image-card'

import { useLastViewedPhoto } from '@/utils/use-last-viewed-photo'
import { CHUNK_SIZE, INITIAL_LOAD_COUNT } from '@/utils/constants'
import { ImageProps } from '@/utils/types'

const GridCards = ({
  images,
  folders
}: {
  images: ImageProps[]
  folders: string[]
}) => {
  const [data, setData] = useState(images)
  const [selectedFolder, setSelectedFolder] = useState('All')
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
  const [visibleImages, setVisibleImages] = useState<any[]>([])

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      const threshold = 400 // margin to start loading more before reaching the end
  
      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        const nextChunk = data.slice(
          visibleImages.length,
          visibleImages.length + CHUNK_SIZE
        )
        setVisibleImages(prevVisibleImages => [
          ...prevVisibleImages,
          ...nextChunk
        ])
      }
    }
  
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleImages, data])

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
    if (lastViewedPhoto) {
      lastViewedPhotoRef?.current?.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [lastViewedPhoto, setLastViewedPhoto])

  return (
    <>
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

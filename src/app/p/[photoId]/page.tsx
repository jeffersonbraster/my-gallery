import { notFound } from 'next/navigation'
import Carousel from '@/components/carousel'
import { CldOgImage } from 'next-cloudinary'
import getBase64ImageUrl from '@/utils/generate-blur-placeholder'
import type { ImageProps } from '@/utils/types'
import getResults, { fetchImagesAndFolders } from '@/actions/actions'

interface HomeProps {
  params: {
    photoId: string | string[]
  }
}

const Home = async ({ params }: HomeProps) => {
  const results = await getResults()
  const { images } = await fetchImagesAndFolders();
  let index = Number(params.photoId)

  let reducedResults: ImageProps[] = []
  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      aspect_ratio: result.aspect_ratio,
      public_id: result.public_id,
      format: result.format
    })
    i++
  }

  const currentPhoto = reducedResults.find(
    img => img.id === Number(params.photoId)
  )

  if (!currentPhoto) {
    return notFound()
  }

  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)

  return (
    <>
      <CldOgImage src={currentPhoto.public_id} alt="Jefferson Brandão - Foto" />

      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} images={images} />
      </main>
    </>
  )
}

export default Home

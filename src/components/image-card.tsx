import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

import { ImageProps } from '@/utils/types'

const ImageCard = ({
  id,
  public_id,
  width,
  height,
  blurDataUrl,
  lastViewedPhoto,
  lastViewedPhotoRef
}: ImageProps & {
  lastViewedPhoto: string | null
  lastViewedPhotoRef: React.MutableRefObject<HTMLAnchorElement | null>
}) => {
  return (
    <Link
      key={id}
      href={`/?photoId=${id}`}
      as={`/p/${id}`}
      ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
      shallow
      className={`after:content group relative block w-full  cursor-zoom-in transition after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight`}
    >
      <CldImage
        alt="Jefferson Brandão Fotos"
        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
        style={{ transform: 'translate3d(0, 0, 0)' }}
        placeholder="blur"
        blurDataURL={blurDataUrl}
        src={public_id}
        width={width! > height! ? 1280 : 853}
        height={height! > width! ? 1280 : 853}
        format="webp"
        loading="lazy"
        sizes="
          (max-width: 648px) 100vw,
          25vw
        "
      />
    </Link>
  )
}

export default ImageCard

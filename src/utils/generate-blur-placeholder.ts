import { ImageProps } from "@/utils/types";
import sharp from 'sharp';

const cache = new Map<string, string>();

export default async function getBase64ImageUrl(image: ImageProps): Promise<string> {
  const imageKey = `${image.public_id}.${image.format}`;
  let url = cache.get(imageKey);
  if (url) {
    return url;
  }

  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
  );
  const buffer = await response.arrayBuffer();
  const minifiedBuffer = await sharp(Buffer.from(buffer))
    .jpeg({ quality: 70 })
    .toBuffer();

  url = `data:image/jpeg;base64,${minifiedBuffer.toString('base64')}`;
  cache.set(imageKey, url);
  return url;
}
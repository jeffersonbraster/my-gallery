"use server"

import cloudinary from "@/utils/cloudnary";
import getBase64ImageUrl from "@/utils/generate-blur-placeholder";
import { ImageProps } from "@/utils/types";

let cachedResults: any;

export async function fetchImagesAndFolders() {
  const results = await cloudinary.v2.search
    .sort_by('folder', 'desc')
    .max_results(2000)
    .execute();

  if (results?.next_cursor) {
    const moreResults = await cloudinary.v2.search
      .sort_by('folder', 'desc')
      .next_cursor(results?.next_cursor)
      .max_results(2000)
      .execute();

    results.resources = results.resources.concat(moreResults.resources);
  }

  let reducedResults: ImageProps[] = [];
  let folders: string[] = [];

  let i = 0;
  for (let result of results?.resources) {
    reducedResults.push({
      id: i,
      folder: result.folder,
      height: result.height,
      width: result.width,
      aspect_ratio: result.aspect_ratio,
      public_id: result.public_id,
      format: result.format
    });

    if (!folders.includes(result.folder)) {
      folders.push(result.folder);
    }

    i++;
  }

  const blurImagePromises = results?.resources?.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    images: reducedResults,
    folders
  };
}

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.v2.search
      .sort_by('folder', 'desc')
      .max_results(2000)
      .execute()

    if (fetchedResults?.next_cursor) {
      const moreResults = await cloudinary.v2.search
        .sort_by('folder', 'desc')
        .next_cursor(fetchedResults?.next_cursor)
        .max_results(2000)
        .execute()

      fetchedResults.resources = fetchedResults.resources.concat(
        moreResults.resources
      )
    }

    cachedResults = fetchedResults
  }

  return cachedResults
}



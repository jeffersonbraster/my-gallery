import { fetchImagesAndFolders } from "@/actions/actions";
import GridCards from "@/components/grid-cards";

export default async function Home() {
  const { images, folders } = await fetchImagesAndFolders();

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <GridCards images={images} folders={folders} />
    </main>
  );
}
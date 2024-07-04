/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react'
import useClickOutside from '@/hooks/useClickOutside'
import { Filter } from 'lucide-react'

export default function Menu({
  folders,
  selectedFolder,
  setSelectedFolder
}: {
  folders: string[]
  selectedFolder: string
  setSelectedFolder: (folder: string) => void
}) {
  const $menu = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useClickOutside($menu, () => setMenuOpen(false))

  const handleClick = (folder: string) => {
    setSelectedFolder(folder)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={$menu}>
      <img
        src="arrow.png"
        alt="Filtre por lugar"
        className="ultrawide:visible invisible fixed bottom-24 right-8 h-[450px]"
      />

      <button
        className="bg-medium hover:bg-medium/90 fixed bottom-6 right-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-md transition xl:h-16 xl:w-16"
        onClick={() => setMenuOpen(!menuOpen)}
        title="Filter by place"
      >
        <Filter className="w-9 text-white/50 transition hover:text-white/80 xl:w-10" />
      </button>

      <menu
        className={`bg-medium fixed bottom-20 right-5 mb-5 flex w-48 flex-col gap-2 rounded-lg p-5 shadow-md transition ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        {folders?.map((folder: string) => (
          <div
            key={folder}
            className={`rounded-fullpx-3 z-10 cursor-pointer py-1 transition hover:text-white ${
              selectedFolder === folder ? 'text-details' : 'text-white/50'
            }`}
            onClick={() => handleClick(folder)}
          >
            {folder}
          </div>
        ))}

        <div className="h-[1px] border-t-0 bg-neutral-100/20 opacity-100" />

        <div
          className={`rounded-fullpx-3 z-10 cursor-pointer py-1 transition hover:text-white ${
            selectedFolder === 'All' ? 'text-details' : 'text-white/50'
          }`}
          onClick={() => handleClick('All')}
        >
          Todas as fotos
        </div>
      </menu>
    </div>
  )
}

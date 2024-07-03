import { Github, Instagram, LaptopMinimal, Linkedin } from 'lucide-react'
import React from 'react'

const SocialLinks = () => {
  return (
    <div className='mt-2 flex items-center justify-center gap-3'>
      <a href="https://jeffersonbrandao.com.br" target='_blank' className='font-semibold text-white/20 hover:text-white'>
        <LaptopMinimal className='size-5' />
      </a>

      <a href="https://www.instagram.com/jeffersonbrandao/" target='_blank' className='font-semibold text-white/20 hover:text-white'>
        <Instagram className='size-5' />
      </a>

      <a href="https://www.linkedin.com/in/jefferson-brandao-dev/" target='_blank' className='font-semibold text-white/20 hover:text-white'>
        <Linkedin className='size-5' />
      </a>

      <a href="https://github.com/jeffersonbraster" target='_blank' className='font-semibold text-white/20 hover:text-white'>
        <Github className='size-5' />
      </a>
    </div>
  )
}

export default SocialLinks
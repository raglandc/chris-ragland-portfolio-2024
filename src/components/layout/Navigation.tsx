"use client"
import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import NavLink from './util/NavLink'
import ThemeChanger from '../Themechanger'
import ContactButton from './util/ContactButton'

export default function Navigation() {
  return (
    <nav className='z-20 my-0 mx-auto w-full max-w-7xl px-4 md:px-6'>
      <div className='flex items-center justify-between h-14'>
        <div className='flex items-center w-2/4 md:w-1/3'>
          <Link
            href="/"
          >
            <Image
              src={'/icons/cr-favicon.png'}
              alt='the letters c and r'
              width={27}
              height={27}
            />
          </Link>
        </div>

        <div className='hidden md:flex w-1/3 items-center justify-center'>
          <NavLink link="/" title='Home' />
          <NavLink link="/about" title='About' />
          <NavLink link="/projects" title='Projects' />
          <NavLink link="/blogs" title='Blog' />
        </div>

        <div className='hidden md:flex w-1/3 items-center justify-end'>
          <ThemeChanger/>
          <ContactButton/>
        </div>

        <div className='flex gap-2 w-2/4 md:w-1/3 items-center justify-end md:hidden'>
          <ContactButton />
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}
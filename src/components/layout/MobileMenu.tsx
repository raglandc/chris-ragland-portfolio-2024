"use client"
import { useState } from 'react'
import PortalBackdrop from '../util/PortalBackdrop'
import MobileMenuWindow from "@/components/layout/MobileMenuWindow"

export default function MobileMenu() {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const showMenuHandler = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <>
      <div
        onClick={showMenuHandler}
        className='flex flex-col items-center justify-around w-6 cursor-pointer h-5 hover:scale-105 ease-in-out'
      >
        <div className={'w-full h-px bg-custom-textPrimary'} />
        <div
          className={!showMenu ? 'w-full h-px bg-custom-textPrimary ease-in-out' : 'ease-in-out h-px bg-custom-textPrimary w-2/4'}
        />
        <div className={'w-full h-px bg-custom-textPrimary'} />
      </div>

      {showMenu && (
        <>
          <PortalBackdrop onClick={showMenuHandler} />
          <MobileMenuWindow closeHandler={showMenuHandler} />
        </>
      )}
    </>
  )
}

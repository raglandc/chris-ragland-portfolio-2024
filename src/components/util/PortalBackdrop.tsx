"use client"

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function PortalBackdrop({ ...props }: any) {
  const ref = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.getElementById('backdrop-root')
    setMounted(true)
  }, [])

  return mounted && ref.current
    ? createPortal(
        <div
          {...props}
          className='fixed top-0 z-10 left-0 w-full h-full bg-black/80'
        />,
        ref.current,
      )
    : null
}

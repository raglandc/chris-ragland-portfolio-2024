"use client"

import { useState } from "react"
import { MdMessage } from "react-icons/md"

import PortalBackdrop from "@/components/util/PortalBackdrop";
import ContactWindow from "@/components/ContactWindow";

export default function ContactButton()
{
  const [showContactWindow, setShowContactWindow] = useState(false);

  const showContactWindowHandler = () =>
  {
    setShowContactWindow((prev) => !prev)
  }

  return (
    <>
      <button 
        onClick={() => setShowContactWindow(true)}
        className="hover:bg-gray-300/50 p-2 text-custom-textPrimary w-8 h-8 rounded-full flex justify-center items-center">
        <MdMessage/>
      </button>

      {showContactWindow && (
        <>
          <PortalBackdrop onClick={showContactWindowHandler} />
          <ContactWindow onClick={showContactWindowHandler}/>
        </>
      )}
    </>
  )
}


"use client"
import { useState, useEffect } from "react"
import { FaHome } from 'react-icons/fa'
import { MdWork, MdPerson, MdMessage } from 'react-icons/md'
import { BsMoonStarsFill, BsFillSunFill, BsBookFill } from "react-icons/bs"
import { VscClose } from 'react-icons/vsc'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import PortalOverlay from "../util/PortalOverlay"
import MobileMenuLink from "./util/MobileMenuLink"

type MenuWindowProps = {
  closeHandler: () => void;
}

export default function MobileMenuWindow({ closeHandler }: MenuWindowProps) {
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme();
  const nextTheme = (theme == "dark") ? "light" : "dark";

    // useEffect only runs on the client, so now we can safely show the UI

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <PortalOverlay className='fixed z-20 top-0 left-0 w-10/12 h-screen xl:w-1/3 md:w-8/12 sm:w-10/12 bg-custom-background'>
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className='w-full h-screen px-4 py-5 text-lg'
      >
        <div className='flex items-center justify-between w-full py-4 rounded-t-lg h-max'>
          <h1 className='text-xl font-bold text-blue-600'>
            Explore 🔭
          </h1>
          <VscClose
            className='w-6 h-6 p-1 cursor-pointer hover:rounded-full hover:bg-slate-100/30'
            onClick={closeHandler}
          />
        </div>
        <ul className='flex flex-col items-center justify-center w-full'>
          <MobileMenuLink 
            closeHandler={closeHandler} 
            link="/" 
            title="Home" 
            icon={<FaHome/>}
          />
          <MobileMenuLink 
            closeHandler={closeHandler} 
            link="/about" 
            title="About" 
            icon={<MdPerson/>}
          />
          <MobileMenuLink 
            closeHandler={closeHandler} 
            link="/projects" 
            title="Projects" 
            icon={<MdWork/>}
          />
          {/* <MobileMenuLink 
            closeHandler={closeHandler} 
            link="/blogs" 
            title="Blog" 
            icon={<BsBookFill/>}
          /> */}
          <div className='flex text-white w-full items-center justify-between bg-gray-500 rounded-md p-4' onClick={() => setTheme(nextTheme)}>
            {theme == "dark" ? (<BsFillSunFill size={18} />) : (<BsMoonStarsFill size={18} />)}
            {theme == "dark" ? "Switch to light mode" : "Switch to dark mode"}
          </div>
        </ul>
      </motion.div>
    </PortalOverlay>
  )
}
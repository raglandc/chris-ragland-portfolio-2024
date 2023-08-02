import React from "react";
import { MdClose, MdAlternateEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import PortalOverlay from "./util/PortalOverlay";

interface ContactWindowProps {
  onClick: React.MouseEventHandler
}

export default function ContactWindow({onClick}: ContactWindowProps)
{
  return (
    <PortalOverlay className="fixed z-30 flex justify-center h-max max-w-screen -translate-y-2/4 -translate-x-2/4 top-2/4 left-2/4">
      <div className="bg-custom-background rounded-lg border py-3 px-4 md:px-6 md:py-5 w-80 md:w-96">
        <div className="w-full flex justify-between py-2">
          <h1 className="text-xl font-bold md:text-2xl"> 
            Say{" "}
            <span className="text-custom-colorPrimary">Hi</span>
            {" "}👋
          </h1>
          <button 
            onClick={onClick}
            className="hover:bg-gray-500 p-2 rounded-full">
            <MdClose />
          </button>
        </div>
        <ul className='flex flex-col items-center justify-center w-full px-4'>
          <ContactLink
            link='https://www.linkedin.com/in/raglandc/'
            icon={<FaLinkedin />}
            title='LinkedIn'
          />
          <ContactLink
            link='https://www.github.com/raglandc'
            icon={<FaGithub />}
            title='GitHub'
          />
          <ContactLink
            link='https://www.instagram.com/chris_ragland/'
            icon={<FaInstagram />}
            title='Instagram'
          />
          <ContactLink
            link=''
            icon={<MdAlternateEmail />}
            title='Chrisragland97@gmail.com'
          />
        </ul>
      </div>
    </PortalOverlay>
  )
}

interface ContactLinkProps {
  link: string;
  icon: React.ReactNode;
  title: string;
}

function ContactLink({ link, icon, title }: ContactLinkProps) {
  return (
    <li className='w-full py-2 h-max'>
      <a
        className='flex items-center w-full py-2 hover:underline-offset-4 hover:underline'
        target='_blank'
        href={link}
        rel='noreferrer'
      >
        <span className='mr-2'>{icon}</span>
        {title}
      </a>
    </li>
  )
}
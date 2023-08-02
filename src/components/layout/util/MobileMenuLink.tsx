"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";

interface MobileMenuLinkProps {
  icon: React.ReactNode;
  title: string;
  closeHandler: () => void;
  link?: string;
}

export default function MobileMenuLink({icon, title, closeHandler, link}: MobileMenuLinkProps)
{
  const path = usePathname();
  const isActive = (path == link) ? "flex items-center justify-between w-full p-2 font-semibold border-b text-blue-500": "flex items-center justify-between w-full py-2 font-semibold border-b hover:text-blue-500 hover:px-2";
  return (
    <li className='w-full pb-2 my-3 h-max'>
      <Link 
        href={link ? link : path} 
        onClick={closeHandler}
        className={isActive}>
          {title}
          <span>{icon}</span>
      </Link>
    </li>
  )
}

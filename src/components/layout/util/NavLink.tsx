"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  link: string;
  title: string;
}

export default function NavLink({link, title}: NavLinkProps)
{
  const path = usePathname();
  return (
    <Link 
      href={link} 
      className={link == path ? "px-3 h-full justify-center flex items-center hover:cursor-pointer text-custom-colorPrimary" : "px-3 h-full justify-center flex items-center hover:text-custom-colorPrimary hover:cursor-pointer"}
    >
      {title}
    </Link>
  )
}
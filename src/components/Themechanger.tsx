"use client";

import React, { useEffect, useState } from "react";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";

export default function ThemeChanger() 
{
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const light = resolvedTheme === "light";
  return (
    <button
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="hover:bg-gray-300/50 p-2 text-custom-textPrimary w-8 h-8 rounded-full flex justify-center items-center"
    >
      {light ? <BsMoonStarsFill size={20} /> : <BsFillSunFill size={20} />}
    </button>
  );
};

"use client"

import { useEffect } from "react";
import tocbot from "tocbot";
export default function TableOfContents() 
{
  useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc", // Select the wrapper of toc
      contentSelector: ".js-toc-content", // Select the wrapper of contents
      headingSelector: "h2, h3", // Choose the heading tags
      /* Optional 1.
      Enable these if you have a sticky header and adjust the offset value
      */
      headingsOffset: 300,
      // scrollSmoothOffset: -100,
      /* Optional 2. 
      Enable this if 'active' class on scroll won't work properly
      */
      // hasInnerContainers: true,
      scrollSmooth: true,

    });
    return () => tocbot.destroy();
  }, []);
  return (
    <aside className='max-w-xl mt-4 mx-auto'>
      <div className='mx-auto p-4 xl:p-6 rounded-md bg-gray-300/40'>
        <h3 className="font-semibold font-lg m-0">Table of contents</h3>
        <div className="js-toc"></div>
      </div>
    </aside>
  );
}
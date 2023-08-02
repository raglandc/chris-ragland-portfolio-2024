import type { MDXComponents } from "mdx/types"

interface YoutubeProps
{
  uid: string;
}

interface ImageProps
{
  title: string;
  link: string;
  description?: string;
}

export const mdxComponents: MDXComponents = 
{
  Youtube: ({ uid }: YoutubeProps) =>
  (
    <div>
      <iframe 
        className="aspect-video w-full rounded-xl"
        src={`https://www.youtube.com/embed/${uid}`} 
        title="YouTube video player"
        allow="accelerometer; clipboard-write; autoplay encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      />
    </div> 
  ),

  Image: ({ title, link, description }: ImageProps) => 
  (
    <div className="mx-auto overflow-hidden shadow-lg rounded-xl">
      <img 
        className="mx-auto m-0 rounded-xl"
        src={link} 
        alt={title} 
      /> 
      {description &&
        <p 
          className="mt-2 font-semibold text-sm px-3 py-4 text-center"
        >
          {description}
        </p>
      }
    </div>
  )
}



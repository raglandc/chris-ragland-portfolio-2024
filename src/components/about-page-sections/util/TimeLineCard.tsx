import { ReactNode } from "react";

interface TimeLineCardProps {
  year: string;
  children: ReactNode;
}

export default function TimeLineCard({year, children, ...props}: TimeLineCardProps) {
  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-6 mx-auto">
      {/* Line leading to date */}
      <div className="w-2 h-24 bg-custom-colorPrimary rounded-lg"/>
      <div className="flex flex-col items-center my-2">
        <div className="w-4 h-4 flex items-center justify-center rounded-full bg-custom-colorPrimary">
          {year == "Current" &&
          <div className="w-4 h-4 rounded-full bg-blue-200 animate-ping duration-500"/> 
          }
        </div>
        <h2 className="mt-1 text-custom-colorPrimary text-2xl font-semibold">{year}</h2>
      </div>
      <div className="w-2 h-8 bg-custom-colorPrimary rounded-lg"/>
      <div className="my-4 max-w-5xl space-y-3">
        {children}
      </div>
    </div>
  )
}
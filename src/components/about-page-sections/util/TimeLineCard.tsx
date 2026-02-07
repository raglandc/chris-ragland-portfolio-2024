import { ReactNode } from "react";

interface TimeLineCardProps {
    year: string;
    children: ReactNode;
}

export default function TimeLineCard({
    year,
    children,
    ...props
}: TimeLineCardProps) {
    return (
        <div className="flex flex-col justify-center items-center px-4 md:px-6 mx-auto">
            {/* Line leading to date */}
            <div className="w-2 h-24 bg-custom-colorPrimary rounded-lg" />
            <div className="flex flex-col items-center">
                {year == "Current" && (
                    <div className="w-5 h-5 my-2 flex items-center justify-center rounded-full bg-custom-colorPrimary">
                        <div className="w-5 h-5 rounded-full bg-blue-200 animate-ping" />
                    </div>
                )}
                <h2 className="my-4 text-custom-colorPrimary text-2xl font-semibold">
                    {year}
                </h2>
            </div>
            <div className="w-2 h-24 bg-custom-colorPrimary rounded-lg" />
            <div className="my-4 max-w-5xl space-y-3">{children}</div>
        </div>
    );
}

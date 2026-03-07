import { ReactNode } from "react";

interface TimeLineCardProps {
    year: string;
    children: ReactNode;
}

export default function TimeLineCard({ year, children }: TimeLineCardProps) {
    const isCurrent = year === "Current";

    return (
        <div className="relative flex gap-8 pb-16 last:pb-0">
            {/* Left: line + node */}
            <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative mt-1.5 w-3 h-3 rounded-full bg-custom-colorPrimary flex-shrink-0">
                    {isCurrent && (
                        <div className="absolute inset-0 rounded-full bg-custom-colorPrimary animate-ping opacity-60" />
                    )}
                </div>
                <div className="flex-1 w-px bg-custom-colorPrimary/25 mt-2" />
            </div>

            {/* Right: year + content */}
            <div className="flex-1 min-w-0">
                <span
                    className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                        isCurrent
                            ? "bg-custom-colorPrimary text-white"
                            : "bg-custom-colorPrimary/10 text-custom-colorPrimary"
                    }`}
                >
                    {isCurrent ? "Present" : year}
                </span>
                <div className="prose dark:prose-invert max-w-none">{children}</div>
            </div>
        </div>
    );
}

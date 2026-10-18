import type { CSSProperties } from "react";
import type { Skill } from "@/data/skills-data";

interface LogoMarqueeProps {
    items: Skill[];
    // Accessible name for the list, e.g. "Technologies I work with".
    label: string;
    // Time for one full loop; longer is slower.
    durationSeconds?: number;
}

// Infinite logo slider. The list is rendered twice side by side and the track
// slides left by exactly one copy (-50%), so the loop restarts seamlessly.
// Each copy is at least as wide as the viewport (100cqw) so there is never a
// gap at the seam, however few items there are. Under prefers-reduced-motion
// it becomes a static, wrapped list instead. Hovering pauses the motion.
export default function LogoMarquee({
    items,
    label,
    durationSeconds = 40,
}: LogoMarqueeProps) {
    return (
        <div className="w-full overflow-hidden [container-type:inline-size] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]">
            <div
                className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
                style={
                    {
                        "--marquee-duration": `${durationSeconds}s`,
                    } as CSSProperties
                }
            >
                <LogoList items={items} label={label} />
                <LogoList items={items} isDuplicate />
            </div>
        </div>
    );
}

interface LogoListProps {
    items: Skill[];
    label?: string;
    // The second copy only exists for the visual loop, so it is hidden from
    // assistive tech and removed entirely when motion is reduced.
    isDuplicate?: boolean;
}

function LogoList({ items, label, isDuplicate = false }: LogoListProps) {
    return (
        <ul
            aria-label={isDuplicate ? undefined : label}
            aria-hidden={isDuplicate || undefined}
            className={`flex shrink-0 min-w-[100cqw] justify-around gap-x-16 pr-16 motion-reduce:min-w-0 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8 motion-reduce:pr-0 ${
                isDuplicate ? "motion-reduce:hidden" : ""
            }`}
        >
            {items.map(({ title, Icon }) => (
                <li
                    key={title}
                    className="flex flex-col items-center gap-2 text-custom-textSecondary hover:text-custom-colorPrimary transition-colors"
                >
                    <Icon aria-hidden className="text-3xl md:text-4xl" />
                    <span className="font-mono text-xs font-medium">
                        {title}
                    </span>
                </li>
            ))}
        </ul>
    );
}

import { useSyncExternalStore } from "react";
import { animeScopeMediaQueries } from "@/lib/animation";

const query = animeScopeMediaQueries.reduceMotion;

function subscribe(onChange: () => void) {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", onChange);
    return () => mediaQueryList.removeEventListener("change", onChange);
}

// Live view of the visitor's OS "reduce motion" setting. The server snapshot
// is false; React re-renders with the real value right after hydration.
export function usePrefersReducedMotion() {
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(query).matches,
        () => false
    );
}

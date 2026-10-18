import { useSyncExternalStore } from "react";
import {
    isClickSoundMuted,
    subscribeClickSoundMuted,
    toggleClickSoundMuted,
} from "@/lib/clickSound";

// The visitor's click-sound mute preference and a toggle for it. The server
// snapshot is "unmuted"; React re-renders with the stored value right after
// hydration.
export function useClickSoundMuted() {
    const muted = useSyncExternalStore(
        subscribeClickSoundMuted,
        isClickSoundMuted,
        () => false
    );
    return [muted, toggleClickSoundMuted] as const;
}

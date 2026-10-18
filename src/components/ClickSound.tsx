"use client";

import { useEffect } from "react";
import {
    playClickSound,
    preloadClickSound,
    SKIP_CLICK_SOUND_ATTRIBUTE,
    unlockClickSound,
} from "@/lib/clickSound";

// One listener for the whole site: every <button> click plays the sound, so
// new buttons get it automatically. Links are left silent on purpose.
export default function ClickSound() {
    useEffect(() => {
        preloadClickSound();

        const onClick = (event: MouseEvent) => {
            const button = (event.target as Element).closest?.("button");
            if (button && !button.hasAttribute(SKIP_CLICK_SOUND_ATTRIBUTE)) {
                playClickSound();
            }
        };

        window.addEventListener("pointerdown", unlockClickSound);
        window.addEventListener("keydown", unlockClickSound);
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("pointerdown", unlockClickSound);
            window.removeEventListener("keydown", unlockClickSound);
            window.removeEventListener("click", onClick);
        };
    }, []);

    return null;
}

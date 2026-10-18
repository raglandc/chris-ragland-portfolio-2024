"use client";

import { BsVolumeMuteFill, BsVolumeUpFill } from "react-icons/bs";
import { useClickSoundMuted } from "@/hooks/useClickSoundMuted";

export default function SoundToggle() {
    const [muted, toggleMuted] = useClickSoundMuted();

    return (
        <button
            type="button"
            onClick={toggleMuted}
            data-skip-click-sound
            aria-label={muted ? "Unmute click sounds" : "Mute click sounds"}
            className="hover:bg-gray-300/50 p-2 text-custom-textPrimary w-8 h-8 rounded-full flex justify-center items-center"
        >
            {muted ? <BsVolumeMuteFill size={20} /> : <BsVolumeUpFill size={20} />}
        </button>
    );
}

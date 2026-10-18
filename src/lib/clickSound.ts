const SOUND_URL = "/sounds/click.mp3";
const VOLUME = 0.35;
const STORAGE_KEY = "click-sound-muted";
// Buttons with this attribute play their own sound (or none) and are skipped
// by the site-wide click listener.
export const SKIP_CLICK_SOUND_ATTRIBUTE = "data-skip-click-sound";

// ---- Mute preference: a tiny external store, persisted across visits ----

const listeners = new Set<() => void>();
let muted: boolean | null = null;

function readStoredMuted() {
    try {
        return localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
        // Storage can be unavailable (private mode, blocked site data).
        return false;
    }
}

export function isClickSoundMuted() {
    if (muted === null) muted = readStoredMuted();
    return muted;
}

export function setClickSoundMuted(value: boolean) {
    muted = value;
    try {
        localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
        // Still muted for this visit, just not remembered.
    }
    listeners.forEach((listener) => listener());
}

// Unmuting plays the sound as confirmation; muting stays silent. Done here
// rather than via the site-wide listener, which may run before the state
// changes and would otherwise see the old value.
export function toggleClickSoundMuted() {
    const nextMuted = !isClickSoundMuted();
    setClickSoundMuted(nextMuted);
    if (!nextMuted) playClickSound();
}

export function subscribeClickSoundMuted(listener: () => void) {
    // Keeps other open tabs in sync when the preference changes.
    const onStorage = (event: StorageEvent) => {
        if (event.key !== STORAGE_KEY) return;
        muted = event.newValue === "true";
        listener();
    };
    listeners.add(listener);
    window.addEventListener("storage", onStorage);
    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
    };
}

// ---- Playback: Web Audio, so rapid clicks play instantly and overlap ----

let audioData: Promise<ArrayBuffer> | null = null;
let context: AudioContext | null = null;
let output: GainNode | null = null;
let buffer: AudioBuffer | null = null;

// Downloads the file early; no user gesture is needed for this part.
export function preloadClickSound() {
    if (audioData) return;
    audioData = fetch(SOUND_URL).then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${SOUND_URL}`);
        return response.arrayBuffer();
    });
    // Allow a later call to retry after a failed download.
    audioData.catch(() => {
        audioData = null;
    });
}

// Browsers only let audio start after a user gesture, so the AudioContext is
// created on the first pointerdown/keydown, just before the click lands.
export function unlockClickSound() {
    if (context) return;
    preloadClickSound();
    context = new AudioContext();
    output = context.createGain();
    output.gain.value = VOLUME;
    output.connect(context.destination);

    const ctx = context;
    audioData
        ?.then((data) => ctx.decodeAudioData(data))
        .then((decoded) => {
            buffer = decoded;
        })
        .catch(() => {
            // Fail silently: a missing click sound should never break a click.
        });
}

export function playClickSound() {
    if (!context || !output || !buffer || isClickSoundMuted()) return;
    if (context.state === "suspended") void context.resume();
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(output);
    source.start();
}

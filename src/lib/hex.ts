// Random lowercase hex string, e.g. randomHex(4) -> "3fa9".
export function randomHex(length: number) {
    const bytes = crypto.getRandomValues(new Uint8Array(length));
    return Array.from(bytes, (byte) => (byte % 16).toString(16)).join("");
}

// A short hash-like fragment such as "a9f3" or "0x7e".
export function createHashFragment() {
    const hex = randomHex(2 + Math.floor(Math.random() * 3));
    return Math.random() < 0.5 ? `0x${hex}` : hex;
}

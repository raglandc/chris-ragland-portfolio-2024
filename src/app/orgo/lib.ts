import fs from "node:fs";
import path from "node:path";

// Everything for this page lives in src/app/orgo. Drop Anki decks (.apkg),
// gifs, and images into _files/ — they're served at /orgo/files/<name>.
export const FILES_DIR = path.join(process.cwd(), "src/app/orgo/_files");

export const MIME_TYPES: Record<string, string> = {
    ".apkg": "application/octet-stream",
    ".colpkg": "application/octet-stream",
    ".gif": "image/gif",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".pdf": "application/pdf",
};

export function listFiles(): string[] {
    if (!fs.existsSync(FILES_DIR)) return [];
    return fs
        .readdirSync(FILES_DIR)
        .filter((f) => path.extname(f).toLowerCase() in MIME_TYPES);
}

export function listDecks() {
    return listFiles()
        .filter((f) => /\.(apkg|colpkg)$/i.test(f))
        .map((file) => ({
            file,
            name: file.replace(/\.(apkg|colpkg)$/i, "").replace(/[-_]+/g, " ").trim(),
            size: fs.statSync(path.join(FILES_DIR, file)).size,
            href: `/orgo/files/${encodeURIComponent(file)}`,
        }));
}

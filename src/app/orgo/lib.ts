import { execFileSync } from "node:child_process";
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

// When the decks were last updated: the latest git commit touching a deck, since
// mtime on a fresh clone is just the checkout time. Falls back to the newest mtime.
export function decksUpdatedAt(files: string[]): Date | null {
    if (files.length === 0) return null;
    const paths = files.map((f) => path.join(FILES_DIR, f));
    try {
        const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
            encoding: "utf8",
        }).trim();
        if (out) return new Date(out);
    } catch {}
    return new Date(Math.max(...paths.map((p) => fs.statSync(p).mtimeMs)));
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

import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { FILES_DIR, MIME_TYPES, listFiles } from "../../lib";

// Prerender every file in _files/ at build time; anything else 404s.
export const dynamicParams = false;
export const generateStaticParams = () => listFiles().map((name) => ({ name }));

export function GET(_req: Request, { params }: { params: { name: string } }) {
    const name = decodeURIComponent(params.name);
    if (!listFiles().includes(name)) notFound();
    const ext = path.extname(name).toLowerCase();
    const isDeck = ext === ".apkg" || ext === ".colpkg";
    return new Response(fs.readFileSync(path.join(FILES_DIR, name)), {
        headers: {
            "Content-Type": MIME_TYPES[ext],
            ...(isDeck && { "Content-Disposition": `attachment; filename="${name}"` }),
        },
    });
}

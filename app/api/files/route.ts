import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

async function ensureUploadsDir() {
  await fsp.mkdir(UPLOADS_DIR, { recursive: true });
}

// GET — list all files using non-blocking parallel stat calls
export async function GET() {
  try {
    await ensureUploadsDir();
    const names = await fsp.readdir(UPLOADS_DIR);

    const entries = await Promise.all(
      names.map(async (name) => {
        try {
          const stat = await fsp.stat(path.join(UPLOADS_DIR, name));
          if (!stat.isFile()) return null;
          return {
            name,
            size: stat.size,
            mtimeMs: stat.mtimeMs,
            uploadedAt: stat.mtime.toISOString(),
          };
        } catch {
          return null;
        }
      })
    );

    const files = entries
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
      .sort((a, b) => b.mtimeMs - a.mtimeMs)
      .map(({ name, size, uploadedAt }) => ({ name, size, uploadedAt }));

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}

// POST — zero-copy backpressure-aware streaming upload
export async function POST(req: NextRequest) {
  try {
    await ensureUploadsDir();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const safeName = path
      .basename(file.name)
      .replace(/[^a-zA-Z0-9._\-\u0400-\u04FF]/g, "_");
    const destPath = path.join(UPLOADS_DIR, safeName);

    await pipeline(
      Readable.fromWeb(file.stream() as never),
      fs.createWriteStream(destPath)
    );

    return NextResponse.json({ success: true, name: safeName });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// DELETE — single non-blocking syscall
export async function DELETE(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "No filename provided" }, { status: 400 });
    }

    const safeName = path.basename(name);
    const filePath = path.join(UPLOADS_DIR, safeName);

    try {
      await fsp.unlink(filePath);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
      throw err;
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

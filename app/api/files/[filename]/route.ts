import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

const MIME_TYPES: Record<string, string> = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  bmp: "image/bmp",
  ico: "image/x-icon",
  avif: "image/avif",

  // Documents
  pdf: "application/pdf",

  // Video
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "video/ogg",
  ogv: "video/ogg",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",

  // Audio
  mp3: "audio/mpeg",
  wav: "audio/wav",
  flac: "audio/flac",
  m4a: "audio/mp4",
  aac: "audio/aac",

  // Data / Text / Code
  json: "application/json; charset=utf-8",
  xml: "application/xml; charset=utf-8",
  txt: "text/plain; charset=utf-8",
  md: "text/plain; charset=utf-8",
  csv: "text/plain; charset=utf-8",
  log: "text/plain; charset=utf-8",
  ini: "text/plain; charset=utf-8",
  conf: "text/plain; charset=utf-8",
  yaml: "text/plain; charset=utf-8",
  yml: "text/plain; charset=utf-8",
  js: "text/plain; charset=utf-8",
  jsx: "text/plain; charset=utf-8",
  ts: "text/plain; charset=utf-8",
  tsx: "text/plain; charset=utf-8",
  css: "text/plain; charset=utf-8",
  scss: "text/plain; charset=utf-8",
  html: "text/plain; charset=utf-8",
  py: "text/plain; charset=utf-8",
  cs: "text/plain; charset=utf-8",
  java: "text/plain; charset=utf-8",
  c: "text/plain; charset=utf-8",
  cpp: "text/plain; charset=utf-8",
  h: "text/plain; charset=utf-8",
  go: "text/plain; charset=utf-8",
  rs: "text/plain; charset=utf-8",
  sh: "text/plain; charset=utf-8",
  bat: "text/plain; charset=utf-8",
  ps1: "text/plain; charset=utf-8",
  sql: "text/plain; charset=utf-8",
};

function getMimeType(filename: string): string {
  const dotIdx = filename.lastIndexOf(".");
  const ext = dotIdx !== -1 ? filename.slice(dotIdx + 1).toLowerCase() : "";
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const decoded = decodeURIComponent(filename);
    const safeName = path.basename(decoded);
    const filePath = path.join(UPLOADS_DIR, safeName);

    let stat: fs.Stats;
    try {
      stat = await fsp.stat(filePath);
      if (!stat.isFile()) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileSize = stat.size;
    const etag = `W/"${fileSize.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    const forceDownload = req.nextUrl.searchParams.get("download") === "1";
    const rangeHeader = req.headers.get("range");

    if (!forceDownload && !rangeHeader && req.headers.get("if-none-match") === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: etag,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const contentType = forceDownload
      ? "application/octet-stream"
      : getMimeType(safeName);

    const dispositionType = forceDownload ? "attachment" : "inline";
    const asciiFallback = safeName.replace(/[^\x20-\x7E]/g, "_");
    const contentDisposition = `${dispositionType}; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(safeName)}`;

    const baseHeaders: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
      "Accept-Ranges": "bytes",
      "X-Content-Type-Options": "nosniff",
      ETag: etag,
      "Last-Modified": stat.mtime.toUTCString(),
      "Cache-Control": forceDownload ? "private, no-cache" : "public, max-age=3600",
    };

    if (!forceDownload && contentType.startsWith("image/svg")) {
      baseHeaders["Content-Security-Policy"] =
        "default-src 'none'; img-src data: 'self'; style-src 'unsafe-inline'; sandbox";
    }

    if (rangeHeader && !forceDownload) {
      const match = rangeHeader.match(/bytes=(\d*)-(\d*)/);
      if (match) {
        const start = match[1] ? parseInt(match[1], 10) : 0;
        const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize || start > end) {
          return new NextResponse(null, {
            status: 416,
            headers: {
              "Content-Range": `bytes */${fileSize}`,
            },
          });
        }

        const chunkSize = end - start + 1;
        const stream = fs.createReadStream(filePath, { start, end });

        return new NextResponse(
          Readable.toWeb(stream) as unknown as ReadableStream<Uint8Array>,
          {
            status: 206,
            headers: {
              ...baseHeaders,
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Content-Length": chunkSize.toString(),
            },
          }
        );
      }
    }

    const stream = fs.createReadStream(filePath);
    return new NextResponse(
      Readable.toWeb(stream) as unknown as ReadableStream<Uint8Array>,
      {
        status: 200,
        headers: {
          ...baseHeaders,
          "Content-Length": fileSize.toString(),
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 });
  }
}

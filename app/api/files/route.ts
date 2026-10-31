import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export const config = {
  api: { bodyParser: false },
};

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// GET — list all files
export async function GET() {
  try {
    const files = fs.readdirSync(UPLOADS_DIR).map((name) => {
      const filePath = path.join(UPLOADS_DIR, name);
      const stat = fs.statSync(filePath);
      return {
        name,
        size: stat.size,
        uploadedAt: stat.mtime.toISOString(),
      };
    });

    files.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}

// POST — upload file (streaming write to avoid loading entire file in RAM)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const safeName = path.basename(file.name).replace(/[^a-zA-Z0-9._\-\u0400-\u04FF]/g, "_");
    const destPath = path.join(UPLOADS_DIR, safeName);

    // Stream chunks to disk — no full RAM load
    const writeStream = fs.createWriteStream(destPath);
    const reader = file.stream().getReader();

    await new Promise<void>((resolve, reject) => {
      const pump = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              writeStream.end();
              break;
            }
            const canContinue = writeStream.write(Buffer.from(value));
            if (!canContinue) {
              await new Promise<void>((r) => writeStream.once("drain", r));
            }
          }
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        } catch (err) {
          writeStream.destroy();
          reject(err);
        }
      };
      pump();
    });

    return NextResponse.json({ success: true, name: safeName });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// DELETE — remove a file
export async function DELETE(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "No filename provided" }, { status: 400 });
    }

    const safeName = path.basename(name);
    const filePath = path.join(UPLOADS_DIR, safeName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

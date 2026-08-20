import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { verifyAdmin } from "@/lib/auth";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 15;
const MAX_WIDTH = 1200;
const THUMB_WIDTH = 400;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "vehicles");

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Vercel's filesystem is read-only, so writing into public/uploads fails
  // there. Until uploads move to blob storage, return a clear message rather
  // than a generic 500 so the admin knows to paste image URLs instead.
  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "File uploads aren't available on the live site yet. Use the \"Add URL\" option to link images instead.",
      },
      { status: 501 }
    );
  }

  try {
    // public/uploads is gitignored, so it may not exist on a fresh clone.
    await mkdir(UPLOAD_DIR, { recursive: true });

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} images per upload` },
        { status: 400 }
      );
    }

    const results: { url: string; thumbnail: string }[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.type}. Allowed: jpg, png, webp` },
          { status: 400 }
        );
      }

      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 5MB limit` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const id = randomUUID();
      const filename = `${id}.${ext}`;
      const thumbFilename = `${id}_thumb.${ext}`;

      const image = sharp(buffer);
      const metadata = await image.metadata();

      const mainBuffer =
        metadata.width && metadata.width > MAX_WIDTH
          ? await image.resize(MAX_WIDTH, null, { withoutEnlargement: true }).toBuffer()
          : buffer;

      const thumbBuffer = await sharp(buffer)
        .resize(THUMB_WIDTH, null, { withoutEnlargement: true })
        .toBuffer();

      await writeFile(path.join(UPLOAD_DIR, filename), mainBuffer);
      await writeFile(path.join(UPLOAD_DIR, thumbFilename), thumbBuffer);

      results.push({
        url: `/uploads/vehicles/${filename}`,
        thumbnail: `/uploads/vehicles/${thumbFilename}`,
      });
    }

    return NextResponse.json({ images: results });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

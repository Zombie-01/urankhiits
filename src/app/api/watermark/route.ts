import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();

  try {
    // Load the base image from the provided URL
    const image = await loadImage(imageUrl);

    // Resolve the path to the watermark image in the public folder
    const watermarkPath = path.join(
      process.cwd(),
      "public",
      "rooms",
      "watermark.png"
    );
    const watermarkBuffer = await fs.readFile(watermarkPath);
    const watermark = await loadImage(watermarkBuffer);

    // Set up canvas
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the base image on the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Set watermark dimensions (resize as needed)
    const watermarkWidth = image.width * 0.3; // 30% of the base image width
    const watermarkHeight =
      (watermark.height / watermark.width) * watermarkWidth;

    // Position the watermark at the bottom right
    const x = image.width - watermarkWidth - 20; // 20px padding from the right
    const y = image.height - watermarkHeight - 20; // 20px padding from the bottom

    // Draw the watermark image with opacity
    ctx.globalAlpha = 0.5; // Adjust opacity (0 to 1)
    ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);

    // Convert the canvas to a buffer (image file)
    const buffer = canvas.toBuffer("image/png");

    // Return the image as a downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="watermarked_image.png"'
      }
    });
  } catch (error) {
    console.error("Error adding watermark:", error);
    return new NextResponse("Failed to add watermark", { status: 500 });
  }
}

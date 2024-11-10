import { NextRequest, NextResponse } from "next/server";

import { createCanvas, loadImage } from "canvas";

export async function POST(req: NextRequest) {
  const { imageUrl, watermarkText } = await req.json();

  try {
    // Load the base image
    const image = await loadImage(imageUrl);

    // Set up canvas
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the base image on the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Set watermark text style
    ctx.font = "bold 48px Arial"; // Adjust font size as needed
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // White with 50% opacity
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Position watermark at the bottom center
    const x = image.width / 2;
    const y = image.height - 50; // Adjust the y-coordinate to position it

    // Draw watermark text
    ctx.fillText(watermarkText, x, y);

    // Convert the canvas to a buffer (image file)
    const buffer = canvas.toBuffer("image/png");

    // Return the image as a downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="watermarked_image.png"',
      },
    });
  } catch (error) {
    console.error("Error adding watermark:", error);
    return new NextResponse("Failed to add watermark", { status: 500 });
  }
}

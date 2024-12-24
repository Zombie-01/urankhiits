import { NextResponse } from "next/server";
import Replicate from "replicate";
import { Readable } from "stream";

export const maxDuration = 60;

// Fake streaming function
async function* fakeStream(output: string[]) {
  for (const chunk of output) {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield chunk;
  }
}

// Main handler
export async function POST(req: Request) {
  try {
    // 1. Parse input
    const body = await req.json();
    const { image, prompt } = body;

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Initialize Replicate API
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string
    });

    // 3. Set the model and inputs
    const model =
      "erayyavuz/interior-ai:e299c531485aac511610a878ef44b554381355de5ee032d109fcae5352f39fa9";
    const input = {
      input: image,
      prompt: prompt,
      negative_prompt:
        "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional",
      num_inference_steps: 25
    };

    // 4. Simulate the API call and processing
    const fakeOutput = [
      "Step 1: Processing image...",
      "Step 2: Running the AI model...",
      "Step 3: Generating output...",
      "Step 4: Finalizing..."
    ];

    // Optional: Uncomment this if you use Replicate API
    // const result = await replicate.run(model, { input });

    // 5. Create a Readable stream
    const stream = new Readable({
      read() {} // No-op
    });

    // Send headers to mimic streaming
    const headers = new Headers();
    headers.append("Content-Type", "text/event-stream");
    headers.append("Cache-Control", "no-cache");
    headers.append("Connection", "keep-alive");

    // Start streaming response
    const response = new Response(stream as any, { headers });
    (async () => {
      for await (const chunk of fakeStream(fakeOutput)) {
        stream.push(`data: ${chunk}\n\n`); // Send as event-stream
      }
      stream.push(null); // End the stream
    })();

    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Replicate from "replicate";
export const maxDuration = 500


// This function handles POST requests for the API route
export async function POST(req: Request) {
  try {
    // 1. Get request data (in JSON format) from the client
    const body = await req.json();
    const { image, prompt } = body;

    // Check if essential fields are present
    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Initialize the replicate object with our Replicate API token
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string
    });

    // 3. Set the model that we're about to run
    const model =
      "erayyavuz/interior-ai:e299c531485aac511610a878ef44b554381355de5ee032d109fcae5352f39fa9";
    // "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b";
    // 4. Set the image which is the image we uploaded from the client
    const input = {
      input: image,
      prompt: prompt,
      negative_prompt:
        "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional",
      num_inference_steps: 25
    };

    // 5. Run the Replicate's model (to remove background) and get the output image
    const output = await replicate.run(model, { input });
    console.log(output);

    // 6. Check if the output is NULL then return error back to the client
    if (!output) {
      console.log("Something went wrong");
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    // const response = await client.upload({
    //   image: (output as any)[1],
    //   title: "Meme",
    //   description: "Dank Meme",
    // });
    // console.log(response.data?.link);

    // 8. Upload the image to Pinterest using the access token
    // const pinterestResponse = await fetch(
    //   "https://api.pinterest.com/v1/pins/",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       board: "<YOUR_BOARD_ID>", // Specify the board ID
    //       note: "Generated Image for Interior Design",
    //       link: "http://yourwebsite.com",
    //       image_url: (output as any)[1],
    //     }),
    //   }
    // );

    // const pinterestData = await pinterestResponse.json();
    // console.log(pinterestData);

    // 7. Return the output back to the client
    return NextResponse.json({ output }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import Replicate from "replicate";

// ESModule syntax
// import { ImgurClient } from "imgur";

// CommonJS syntax

// all credentials with a refresh token, in order to get access tokens automatically
// const client = new ImgurClient({
// });

// This function handles POST requests for the API route
export async function POST(req: Request) {
  try {
    // 1. Get request data (in JSON format) from the client
    const body = await req.json();
    const { image, theme, room } = body;

    // Check if essential fields are present
    if (!image || !theme || !room) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2. Initialize the replicate object with our Replicate API token
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });

    // 3. Set the model that we're about to run
    const model =
      // "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38";
      "jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b";

    // 4. Set the image which is the image we uploaded from the client
    const input = {
      image,
      prompt: `A ${theme} ${room} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
      a_prompt: `best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`,
      n_prompt:
        "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
      ddim_steps: 20,
      num_samples: "1",
      value_threshold: 0.1,
      image_resolution: "512",
      detect_resolution: 512,
      distance_threshold: 0.1,
    };

    // 5. Run the Replicate's model (to remove background) and get the output image
    const output = await replicate.run(model, { input });

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

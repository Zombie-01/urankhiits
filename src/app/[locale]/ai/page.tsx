"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@/app/[locale]/select";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { Compare } from "@/components/ui/compare";
import { FileUpload } from "@/components/ui/file-upload";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { nanoid } from "nanoid";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { supabase } from "../../../../utils/supabase/client";

const themes = ["Modern", "Vintage", "Minimalist", "Professional"];
const rooms = [
  {
    title: "Living Room",
    image: "/rooms/Living Room.png"
  },

  {
    title: "Bedroom",
    image: "/rooms/Bedroom.jpg"
  },
  {
    title: "Bathroom",
    image: "/rooms/Bathroom.jpg"
  },
  {
    title: "Office",
    image: "/rooms/Office.png"
  },
  {
    title: "Kitchen",
    image: "/rooms/Kitchen.png"
  },
  {
    title: "Other",
    image: "/rooms/Other.jpg"
  }
];

const loadingStates = [
  {
    text: "Upload image"
  },
  {
    text: "Detect specs"
  },
  {
    text: "generate image"
  },
  {
    text: "Send generated image"
  }
];

const building = ["Residential", "Commercial", "Exterior"];

export default function ImagePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [theme, setTheme] = useState<string>("Modern Minimalist");
  const [room, setRoom] = useState<{ title: string; image: string }>(rooms[0]);
  const [build, setBuild] = useState<string>(building[0]);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    // Apply the dark class to the <html> element when dark mode is enabled
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  function convertImageToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryStr = reader.result as string;
      setBase64Image(binaryStr);
    };
  }

  async function downloadOutputImage() {
    const response = await fetch("/api/watermark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageUrl: outputImage
      })
    });

    const link = document.createElement("a");
    const blob = await response.blob();

    const imageObjectURL = URL.createObjectURL(blob);
    link.href = imageObjectURL;
    link.download = "watermarked_image.png";

    link.click();
    URL.revokeObjectURL(imageObjectURL);
  }

  async function submitImage(): Promise<void> {
    try {
      if (!file) {
        toast.error("Please upload an image.");
        return;
      }

      setLoading(true);

      // Call the API to process the image
      const response = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: base64Image,
          theme,
          room: room.title
        })
      });

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
        toast.error(result.error);
        return;
      }

      if (result.output) {
        setOutputImage(result.output);

        // Fetch the generated image file from the URL
        const resSt = await fetch(result.output);
        if (!resSt.ok) {
          throw new Error("Failed to fetch the file from the URL.");
        }

        // Convert response to Blob
        const blob = await resSt.blob();

        // Generate unique filename
        const extension = file.name.split(".").pop();
        const filename = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2)}`;

        // Upload Blob to Supabase Storage
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("projects")
            .upload(`${filename}.${extension}`, blob, {
              contentType: blob.type // Set the content type from the blob
            });

        if (storageError) {
          console.error("Error uploading file:", storageError.message);
          toast.error("Failed to upload image. Please try again.");
          return;
        }

        // Get the public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(`${filename}.${extension}`);
        const publicUrl = publicUrlData?.publicUrl;

        if (!publicUrl) {
          toast.error("Failed to generate image URL.");
          return;
        }

        // Save metadata to Supabase database
        const { error: dbError } = await supabase.from("generated").insert({
          image: publicUrl,
          prompt: `A ${theme} ${room} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window (balanced with walls if window not detected then don't add window), Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
          user: session?.user?.name || null // Add user ID or null if unavailable
        });

        if (dbError) {
          console.error("Error saving metadata:", dbError.message);
          toast.error("Failed to save metadata. Please try again.");
          return;
        }

        toast.success("Image processed and saved successfully!");
      } else {
        console.error("Unexpected result format. Unable to display image.");
      }
    } catch (error) {
      console.error("Error submitting image:", error);
      toast.error("An error occurred while submitting the image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  p-8">
      <MultiStepLoader
        duration={2000}
        loading={isLoading}
        loadingStates={loadingStates}
      />

      <div className="max-w-6xl flex flex-col gap-4 my-16 mx-auto">
        <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className=" mb-4 dark:text-white">
            1. Choose your building type
          </h2>
          <div className="flex flex-wrap gap-4">
            {building.map((type) => (
              <button
                onClick={() => setBuild(type)}
                key={type}
                className={`items-center w-full sm:w-auto relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  build === type ? "border-2 border-blue-600" : ""
                }`}>
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className="mb-4 dark:text-white">2. Choose Room Type</h2>
          <div className="flex  gap-4 py-2 overflow-auto max-w-full">
            {rooms.map((r) => (
              <div
                key={r.title}
                onClick={() => setRoom(r)}
                className={`items-center relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  room === r ? "border-2 border-blue-600" : ""
                }`}>
                <img
                  src={r.image}
                  alt="hero"
                  className="w-full h-full object-cover aspect-video"
                />
                <span className="text-white absolute bottom-4 left-4 ">
                  {r.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full  gap-6">
          <div className="md:w-1/3 flex flex-col gap-4">
            <h2 className=" dark:text-white">3. Upload Your Image</h2>
            <div className="border-2 relative h-full border-dashed rounded-md flex items-center justify-center">
              {!base64Image ? (
                <FileUpload
                  onChange={(e) => {
                    convertImageToBase64(e[0]);
                    setFile(e[0]);
                  }}
                />
              ) : (
                <img
                  src={base64Image}
                  className="w-full h-full rounded-xl overflow-hidden  object-cover "
                />
              )}
            </div>
            <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
              <h2 className="mb-4">4. Choose Color Tone</h2>
              <div className="grid grid-cols-5 gap-4">
                {/* Define color options with names */}
                {[
                  {
                    label: "Modern Minimalist",
                    colors: ["#ffffff", "#cccccc", "#333333"]
                  },
                  {
                    label: "Scandinavian",
                    colors: ["#f4f4f4", "#d9c7b7", "#8d7b6a"]
                  },
                  {
                    label: "Industrial",
                    colors: ["#2e2e2e", "#737373", "#d6cfc7"]
                  },
                  {
                    label: "Bohemian",
                    colors: ["#b57f50", "#f5e3d3", "#a86b5a"]
                  },
                  {
                    label: "Coastal",
                    colors: ["#d8f1f2", "#86a8d1", "#f5f5dc"]
                  },
                  {
                    label: "Rustic Farmhouse",
                    colors: ["#dbd3c9", "#796d5a", "#bca580"]
                  },
                  {
                    label: "Mid-Century Modern",
                    colors: ["#ff6f61", "#fde1a9", "#5b5b5b"]
                  },
                  {
                    label: "Victorian",
                    colors: ["#543f6f", "#9a8a97", "#e9d8c9"]
                  },
                  {
                    label: "Art Deco",
                    colors: ["#f7d8ba", "#ac7339", "#3a3a52"]
                  },
                  {
                    label: "Tropical",
                    colors: ["#2e8b57", "#f3e2a9", "#ff6347"]
                  },
                  {
                    label: "Luxury Modern",
                    colors: ["#282c34", "#b4975a", "#ece9e4"]
                  },
                  {
                    label: "Zen Japanese",
                    colors: ["#f4efe6", "#847462", "#d2b48c"]
                  },
                  {
                    label: "Contemporary",
                    colors: ["#4a4a4a", "#a3a3a3", "#f7f7f7"]
                  },
                  {
                    label: "Mediterranean",
                    colors: ["#3f88c5", "#f6a623", "#f3eacb"]
                  },
                  {
                    label: "Desert Chic",
                    colors: ["#c28e6c", "#f4e2b8", "#736f4c"]
                  },
                  {
                    label: "Urban Jungle",
                    colors: ["#4c956c", "#cddcab", "#3e403f"]
                  },
                  {
                    label: "Futuristic",
                    colors: ["#232323", "#7a7a7a", "#e8e8e8"]
                  },
                  {
                    label: "Eclectic",
                    colors: ["#faae42", "#55828b", "#d9d9d9"]
                  },
                  { label: "Retro", colors: ["#ed6a5a", "#f4f1bb", "#9bc1bc"] },
                  {
                    label: "Warm Neutrals",
                    colors: ["#b39c94", "#e3d5ca", "#ffffff"]
                  }
                ].map((palette, index) => (
                  <div
                    key={index}
                    onClick={() => setTheme(palette.label)}
                    className={`flex flex-col gap-2 border  rounded-md p-4 transition-transform transform hover:scale-105 cursor-pointer ${
                      palette?.label === theme
                        ? "border-black dark:border-white"
                        : "border-gray-300"
                    }`}>
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 rounded"
                        style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 min-h-[200px]">
            <h2 className="text-lg font-bold dark:text-white">
              Uran AI Generated
            </h2>
            <div className="border rounded-md min-h-[200px] overflow-hidden h-full w-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
              {outputImage ? (
                <img
                  src={outputImage}
                  className="w-full h-full object-cover "
                />
              ) : (
                <span className="text-black  dark:text-white">
                  Generated image will appear here
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => {
              setFile(null);
              setOutputImage(null);
              setBase64Image(null);
            }}
            className="px-4 py-2 bg-gray-200 dark:bg-slate-500 text-black dark:text-white rounded-md">
            Reset
          </button>
          {outputImage ? (
            <button
              onClick={() => downloadOutputImage()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Download
            </button>
          ) : (
            <button
              onClick={() => submitImage()}
              className="px-4 py-2 bg-green-600 text-white rounded-md">
              Generate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

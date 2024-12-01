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
  const [theme, setTheme] = useState<string>("");
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
        imageUrl: outputImage,
        watermarkText: "URANKHIITS"
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
                  className="w-full h-full object-cover "
                />
              )}
            </div>
            <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
              <h2 className="mb-4">4. Choose Color Tone</h2>
              <div className="grid grid-cols-5 gap-4">
                {/* Define color options with names */}
                {[
                  { color: "#FF5733", name: "Vibrant Orange" },
                  { color: "#33FF57", name: "Green" },
                  { color: "#3357FF", name: "Blue" },
                  { color: "#FF33A1", name: "Pink" },
                  { color: "#FFD733", name: "Smooth Yellow" },
                  { color: "#6A33FF", name: "Purple" },
                  { color: "#FF6F33", name: "Warm Orange" },
                  { color: "#33FFF5", name: "Cyan" },
                  { color: "#333333", name: "Black" },
                  { color: "#FFFFFF", name: "White" }
                ].map(({ color, name }) => (
                  <button
                    key={color}
                    onClick={() => setTheme(name)} // Update your theme state here
                    style={{ backgroundColor: color }}
                    className={`w-12 h-12 rounded-full shadow-md border-2 border-gray-300 dark:border-gray-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                      name === theme ? "border-4 border-black" : "" // Highlight selected color
                    }`}
                    aria-label={`Select color ${name}`}>
                    <span className="sr-only">{name}</span>{" "}
                    {/* Hidden text for accessibility */}
                  </button>
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

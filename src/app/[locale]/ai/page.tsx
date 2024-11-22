"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@/app/[locale]/select";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { Compare } from "@/components/ui/compare";
import { FileUpload } from "@/components/ui/file-upload";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const themes = ["Modern", "Vintage", "Minimalist", "Professional"];
const rooms = [
  "Living Room",
  "Dining Room",
  "Bedroom",
  "Bathroom",
  "Office",
  "Sasdasd",
  "AasdA",
];

const loadingStates = [
  {
    text: "Upload image",
  },
  {
    text: "Detect specs",
  },
  {
    text: "generate image",
  },
  {
    text: "Send generated image",
  },
];

const building = ["Residential", "Commercial", "Exterior"];

export default function ImagePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [theme, setTheme] = useState<string>("");
  const [room, setRoom] = useState<string>(rooms[0]);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: outputImage,
        watermarkText: "URANKHIITS",
      }),
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

      // if (!session?.user?.image) {
      //   const text = "Do you want to log in with Google?";
      //   if (confirm(text)) {
      //     const res = await signIn("google", { redirect: false });
      //     if (!res?.ok) {
      //       toast.error("Login failed, please try again.");
      //       return;
      //     }
      //   } else {
      //     toast.error("You must be logged in to submit an image.");
      //     return;
      //   }
      // }

      setLoading(true);

      const response = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          theme: theme,
          room: room,
        }),
      });

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
        toast.error(result.error);
        setLoading(false);
        return;
      }

      if (result.output) {
        setOutputImage(result.output);
      } else {
        console.error("Unexpected result format. Unable to display image.");
      }
    } catch (error) {
      console.error("Error submitting image:", error);
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
          <div className="flex gap-4">
            {building.map((type) => (
              <button
                onClick={() => setBuild(type)}
                key={type}
                className={`items-center relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
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
                key={r}
                onClick={() => setRoom(r)}
                className={`items-center relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  room === r ? "border-2 border-blue-600" : ""
                }`}>
                <img
                  src="/hero_1.png"
                  alt="hero"
                  className="w-full h-full object-cover aspect-video"
                />
                <span className="text-white absolute bottom-4 left-4 ">
                  {r}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full  gap-6">
          <div className="w-1/3 flex flex-col gap-4">
            <h2 className=" dark:text-white">3. Upload Your Image</h2>
            <div className="border-2 relative h-full border-dashed rounded-md flex items-center justify-center">
              <FileUpload
                onChange={(e) => {
                  convertImageToBase64(e[0]);
                  setFile(e[0]);
                }}
              />
            </div>
            <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
              <h2 className="mb-4">4. Choose Color Tone</h2>
              <input
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Өөрийн дуртай өнгө сонгоорой"
                className={`px-4 py-[2px] w-full rounded-md bg-white font-bold dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white`}
              />
            </div>
          </div>

          <div className="w-2/3">
            <h2 className="text-lg font-bold dark:text-white">
              Uran AI Generated
            </h2>
            <div className="border rounded-md overflow-hidden h-full w-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
              {outputImage ? (
                <Compare
                  firstImage={URL.createObjectURL(file as any) as any}
                  secondImage={outputImage as any}
                />
              ) : (
                <span className="text-black dark:text-white">
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

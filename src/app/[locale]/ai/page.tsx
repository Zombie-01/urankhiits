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
const rooms = ["Living Room", "Dining Room", "Bedroom", "Bathroom", "Office"];

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

export default function ImagePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [theme, setTheme] = useState<string>(themes[0]);
  const [room, setRoom] = useState<string>(rooms[0]);
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
      <div className="flex justify-end">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mb-4 px-4 py-2 bg-gray-200 dark:bg-slate-500 text-black dark:text-white rounded-md">
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <div className="max-w-6xl flex flex-col gap-4 my-16 mx-auto">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className="text-lg font-bold mb-4 dark:text-white">
            1. Choose your building type
          </h2>
          <div className="flex gap-4">
            {["Residential", "Commercial", "Exterior"].map((type) => (
              <button
                key={type}
                className="px-4 py-2 border rounded-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white">
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className="text-lg font-bold mb-4 dark:text-white">
            2. Choose Room Type
          </h2>
          <div className="flex gap-4 py-2 overflow-x-auto">
            {rooms.map((r) => (
              <button
                key={r}
                onClick={() => setRoom(r)}
                className={`flex flex-col items-center min-w-[120px] p-4 rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  room === r ? "border-2 border-blue-600" : ""
                }`}>
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-600 mb-2"></div>
                <span className="text-black dark:text-white">{r}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className="text-lg font-bold dark:text-white mt-4">
            3. Choose Theme
          </h2>
          <div className="flex gap-4">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-black dark:text-white ${
                  theme === t ? "border-2 border-blue-600" : ""
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold dark:text-white">
              3. Upload Your Image
            </h2>
            <div className="border-2 relative h-full border-dashed rounded-md flex items-center justify-center">
              <FileUpload
                onChange={(e) => {
                  convertImageToBase64(e[0]);
                  setFile(e[0]);
                }}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold dark:text-white">
              Uran AI Generated
            </h2>
            <div className="border rounded-md overflow-hidden h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
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

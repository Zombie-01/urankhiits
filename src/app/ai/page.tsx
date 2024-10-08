"use client";
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Select } from "@/app/select";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { Compare } from "@/components/ui/compare";
import { FileUpload } from "@/components/ui/file-upload";
import FloatingNavDemo from "@/components/example/floating-navbar-demo";
import TypewriterLoader from "../loader";
import DarkModeToggle from "../DarkModeToggle";
import Logo from "../logo";

const themes = ["Modern", "Vintage", "Minimalist", "Professional"];
const rooms = ["Living Room", "Dining Room", "Bedroom", "Bathroom", "Office"];

const acceptedFileTypes = {
  "image/jpeg": [".jpeg", ".jpg", ".png"],
};
export type ImageAreaProps = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

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
    text: "Send resume",
  },
];

export default function ImagePage() {
  const [showLoader, setShowLoader] = useState(true);

  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>(themes[0]);
  const [room, setRoom] = useState<string>(rooms[0]);
  const [error, setError] = useState<string | null>("");
  const [file, setFile] = useState<File | null>(null);

  function convertImageToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryStr = reader.result as string;
      setBase64Image(binaryStr);
    };
  }

  function downloadOutputImage(): void {
    saveAs(outputImage as string, "output.png");
  }

  async function submitImage(): Promise<void> {
    try {
      if (!file) {
        setError("Please upload an image.");
        return;
      }

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
      console.log(result);

      if (result.error) {
        console.error(result.error);
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.output && result.output.length >= 2) {
        setOutputImage(result.output[1]);
      } else {
        console.error("Unexpected result format. Unable to display image.");
      }
    } catch (error) {
      console.error("Error submitting image:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Set a timeout to hide the loader after 4 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {" "}
      <div
        className={`fixed top-0 bg-white dark:bg-black ${
          showLoader ? "opacity-100 z-[99999999]" : "opacity-0 z-[-1000]"
        } left-0 right-0 bottom-0 z-10 transition-opacity duration-500 ease-in-out`}>
        <TypewriterLoader />
      </div>
      <DarkModeToggle />
      <Logo />
      <FloatingNavDemo />
      <div className="py-20 min-h-[calc( 100vh - 50px )] flex items-center justify-center">
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={loading}
          duration={2000}
        />
        <div className="text-center w-full">
          <div className="relative h-40">
            <div className="absolute left-1/2 z-50 -translate-x-1/2">
              <Select
                theme={theme}
                themes={themes}
                room={room}
                rooms={rooms}
                setTheme={setTheme}
                setRoom={setRoom}
              />
            </div>
          </div>

          <div className="flex z-40 justify-center w-full h-full items-center my-8">
            {file ? (
              <Compare
                firstImage={URL.createObjectURL(file as any) as any}
                secondImage={outputImage as any}
              />
            ) : (
              <FileUpload
                onChange={(e) => {
                  convertImageToBase64(e[0]);
                  setFile(e[0]);
                }}
              />
            )}
          </div>

          <div className="gap-4 flex justify-center">
            <button
              onClick={() => {
                setFile(null);
                setOutputImage(null);
                setBase64Image(null);
              }}
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Reset
            </button>

            {outputImage ? (
              <button
                onClick={() => downloadOutputImage()}
                className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Download
              </button>
            ) : (
              <button
                onClick={() => submitImage()}
                className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

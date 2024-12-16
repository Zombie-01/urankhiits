"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";

import { saveAs } from "file-saver";
import { Compare } from "../ui/compare";
import { FileUpload } from "../ui/file-upload";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { Select } from "@/app/[locale]/select";

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

export default function AnimatedModalDemo() {
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
        console.error(result.error); // Display error using console.error
        setError(result.error); // Optionally set error state for other components
        setLoading(false); // Ensure loading state is set to false on error
        return;
      }

      // Assuming result.output is an array of images, set the second image
      if (result.output && result.output.length >= 2) {
        setOutputImage(result.output[1]); // Set the second image in the output
      } else {
        console.error("Unexpected result format. Unable to display image."); // Handle unexpected result format
      }
    } catch (error) {
      console.error("Error submitting image:", error);
      console.error("Failed to submit image. Please try again later."); // Display generic error message
    } finally {
      setLoading(false); // Ensure loading state is set to false after completion or error
    }
  }
  return (
    <div className="  flex items-center justify-center">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />
      <Modal>
        <ModalTrigger className="bg-black   dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 text-sm sm:text-xl">
            Try it URAN AI
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white ">
            ✈️
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Your generated
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                image
              </span>{" "}
            </h4>
            <Select
              theme={theme}
              themes={themes}
              room={room}
              rooms={rooms}
              setTheme={setTheme}
              setRoom={setRoom}
            />
            <div className="flex justify-center items-center">
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
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              onClick={() => {
                setFile(null);
                setOutputImage(null);
                setBase64Image(null);
              }}
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              reset
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
                Genertate
              </button>
            )}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

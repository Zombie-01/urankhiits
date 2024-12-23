"use client";
import React, { useEffect, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../../../../../utils/supabase/client";

export default function ImagePage() {
  const [isLoading, setLoading] = useState(false);

  const [prompt, setPropmt] = useState("");
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const t = useTranslations("AI");

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
      const response = await fetch("/api/admin-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: base64Image,
          prompt
        })
      });

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
        toast.error(result.error);
        return;
      }

      if (result.output) {
        // Fetch the generated image file from the URL

        const resSt = await fetch(`${result.output}`);
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
          toast.error(t("image_processing_error"));
          return;
        }

        // Get the public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(`${filename}.${extension}`);
        const publicUrl = publicUrlData?.publicUrl;

        if (!publicUrl) {
          toast.error(t("image_processing_error"));
          return;
        }

        // Save metadata to Supabase database
        const { error: dbError } = await supabase.from("generated").insert({
          image: publicUrl,
          prompt,
          user: "admin" // Add user ID or null if unavailable
        });

        if (dbError) {
          console.error("Error saving metadata:", dbError.message);
          toast.error(t("image_processing_error"));
          return;
        }

        setOutputImage(result.output);
        toast.success(t("image_uploaded"));
      } else {
        console.error("Unexpected result format. Unable to display image.");
      }
    } catch (error) {
      console.error("Error submitting image:", error);
      toast.error(t("image_processing_error"));
    } finally {
      setLoading(false);
    }
  }

  function convertImageToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryStr = reader.result as string;
      setBase64Image(binaryStr);
    };
  }

  return (
    <div className="min-h-screen  p-8">
      {isLoading && (
        <div className="absolute z-[9999999999999999999999999999] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="flex flex-col items-center">
            {/* Logo Section */}
            <div className="w-20 h-20">
              <img
                src="/heo_logo.png" // Replace with your logo path
                alt="Logo"
                className="animate-bounce"
              />
            </div>
          </div>
        </div>
      )}

      <div className="md:container flex flex-col gap-4 my-16 mx-auto">
        <div className="md:w-2/3 flex flex-col gap-4">
          <h2 className="text-lg font-bold dark:text-white">
            {t("input_prompt")}
          </h2>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPropmt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            placeholder={
              "A modern bedroom with a cozy atmosphere, featuring a bed with oversized pillows, a faux fur throw, and a dark wood accent wall. A small desk is tucked into the corner, while the floor is covered with a plush, high-pile rug. The room is illuminated by a contemporary floor lamp next to a reading chair."
            }
            rows={6}></textarea>
        </div>
        <div className="flex flex-col md:flex-row w-full  gap-6">
          <div className="md:w-1/3 flex flex-col gap-4">
            <h2 className=" dark:text-white">4. {t("upload_image")}</h2>
            <div className="border-2 relative h-full border-dashed rounded-md flex items-center justify-center">
              {!base64Image ? (
                <FileUpload
                  onChange={(e) => {
                    convertImageToBase64(e[0]);
                    setFile(e[0]);
                  }}
                />
              ) : (
                <div className="p2 sm:p-4">
                  <img
                    src={base64Image}
                    className="w-full h-full rounded-xl overflow-hidden  object-cover "
                  />
                </div>
              )}
            </div>
          </div>

          <div className="md:w-2/3 min-h-[200px]">
            <h2 className="text-lg font-bold dark:text-white">
              {t("generated_image")}
            </h2>
            <div className="border rounded-md min-h-[200px] overflow-hidden h-full w-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
              {outputImage ? (
                <img
                  src={outputImage}
                  className="w-full h-full object-cover "
                />
              ) : (
                <span className="text-black  dark:text-white"></span>
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
            {t("reset")}
          </button>
          {outputImage ? (
            <button
              onClick={() => downloadOutputImage()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md">
              {t("download")}
            </button>
          ) : (
            <button
              onClick={() => submitImage()}
              className="px-4 py-2 bg-green-600 text-white rounded-md">
              {t("generate")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

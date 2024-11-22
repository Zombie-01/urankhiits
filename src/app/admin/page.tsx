"use client";

import Head from "next/head";
import { useRef, useState, ChangeEvent } from "react";
import { nanoid } from "nanoid";
import { supabase } from "../../../utils/supabase/client";

interface UploadedFile {
  publicUrl: string | null;
}

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUpload = async () => {
    if (!title || !desc) {
      alert("Please fill in both the title and description.");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const imageUrls: string[] = [];

    for (const file of selectedFiles) {
      const filename = nanoid();
      const extension = file.name.split(".").pop();
      const { data, error } = await supabase.storage
        .from("projects")
        .upload(`${filename}.${extension}`, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        alert("Error uploading one of the files.");
        return;
      }

      const { data: fileData, error: urlError }: any = await supabase.storage
        .from("projects")
        .getPublicUrl(data?.path || "");

      if (urlError) {
        console.error("Error fetching file URL:", urlError.message);
        return;
      }

      imageUrls.push(fileData?.publicUrl || "");
    }

    setUploadedImages(imageUrls);

    const { data: project, error } = await supabase.from("projects").insert({
      title,
      desc: desc,
      imgs: imageUrls,
    });

    if (error) {
      console.error("Error saving project:", error.message);
    } else {
      console.log("Project saved successfully:", project);
      alert("Project uploaded successfully!");
      setSelectedFiles([]);
      setTitle("");
      setDesc("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="container mx-auto flex flex-col gap-4 mt-8 max-w-[560px] p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-300 mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Upload Project
          </h1>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Project description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images (Max 5)
            </label>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              multiple
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {selectedFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {selectedFiles.length} file(s) selected.
              </p>
            )}
          </div>
        </div>
        <button
          className="mt-5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 duration-200 w-full font-medium"
          type="button"
          onClick={handleUpload}>
          Upload Project
        </button>
        {uploadedImages.length > 0 && (
          <div className="mt-5">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Uploaded Images
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {uploadedImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Head>
        <title>Upload Project</title>
      </Head>
    </>
  );
}

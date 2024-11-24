"use client";

import Head from "next/head";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { nanoid } from "nanoid";
import { supabase } from "../../../../utils/supabase/client";

interface Project {
  id: string;
  title: string;
  desc: string;
  imgs: string[];
}

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjects(data as any);
      }
    };
    fetchProjects();
  }, []);

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

    const { data: project, error } = await supabase.from("projects").insert({
      title,
      desc,
      imgs: imageUrls
    });

    if (error) {
      console.error("Error saving project:", error.message);
    } else {
      console.log("Project saved successfully:", project);
      alert("Project uploaded successfully!");
      setProjects((prev) => [...prev, ...project as any]);
      setSelectedFiles([]);
      setTitle("");
      setDesc("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-gray-100">
        {/* Upload Form */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Upload Project
          </h1>
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
        </div>

        {/* Projects Table */}
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Images</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(project)}>
                  <td className="border border-gray-300 px-4 py-2">
                    {project.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {project.desc}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {project.imgs.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-gray-700 mb-4">{selectedProject.desc}</p>
            <div className="grid grid-cols-2 gap-4">
              {selectedProject.imgs.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-2"
              onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <Head>
        <title>Admin Dashboard</title>
      </Head>
    </>
  );
}

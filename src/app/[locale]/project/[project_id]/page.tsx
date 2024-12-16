"use client";

import { Key, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../../../utils/supabase/client";

interface Project {
  id: string;
  title: string;
  desc: string;
  imgs: string[]; // Array of image URLs
}

export default function ProjectDetail() {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { project_id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      console.log(project_id);
      // Fetch project ID from query params or router (e.g., /project/[id])

      if (!project_id) {
        console.error("Project ID is not provided.");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("id, title, desc, imgs")
          .eq("id", project_id)
          .single();

        if (error) {
          console.error("Error fetching project details:", error.message);
          return;
        }

        setProject(data);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [project_id]);

  if (loading) {
    return <div className="text-center py-8">Loading project details...</div>;
  }

  if (!project) {
    return <div className="text-center py-8">Project not found.</div>;
  }

  return (
    <section className="max-w-7xl min-h-screen flex flex-col gap-8 py-[100px] mx-auto px-4 md:px-8">
      <div className="flex gap-8 flex-col md:flex-row">
        <div className="w-full sm:w-1/3 flex flex-col justify-center gap-4 items-start h-full">
          <h1 className="font-bold text-[48px]">{project.title}</h1>
          <span className="w-[200px] h-[2px] bg-black dark:bg-white"></span>
          <p>{project.desc}</p>
        </div>
        <div className="w-full sm:w-2/3">
          {project.imgs.length > 0 && (
            <div
              className="bg-cover rounded-lg overflow-hidden bg-no-repeat w-full h-full bg-center aspect-video bg-lightgray"
              style={{ backgroundImage: `url(${project.imgs[0]})` }}></div>
          )}
        </div>
      </div>
      {project.imgs
        .slice(1)
        .map((image: any, index: Key | null | undefined) => (
          <div
            key={index}
            className="bg-cover rounded-lg bg-no-repeat w-full h-full bg-center aspect-video bg-lightgray"
            style={{ backgroundImage: `url(${image})` }}></div>
        ))}
    </section>
  );
}

"use client";
// pages/generated-designs.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { Download } from "lucide-react";

const GeneratedDesigns = () => {
  const [user, setUser] = useState<any>(null);
  const [generatedDesigns, setGeneratedDesigns] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user);
      }
    );
  }, []);

  useEffect(() => {
    // Get the logged-in user when the component mounts

    if (user) {
      // Fetch the user's generated designs
      const fetchGeneratedDesigns = async () => {
        const { data, error } = await supabase
          .from("generated") // Assuming your table is named generated_designs
          .select("*")
          .eq("user", user.id);

        if (error) {
          console.error("Error fetching generated designs:", error.message);
        } else {
          setGeneratedDesigns(data || []);
        }
      };

      fetchGeneratedDesigns();
    }
  }, [user]);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  async function downloadOutputImage(outputImage: string) {
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {generatedDesigns.map((design) => (
          <div
            key={design.id}
            className="relative p-2 border rounded bg-white shadow cursor-pointer"
            onClick={() => setSelectedImage(design.image)}>
            <img
              src={design.image}
              alt={`Design ${design.id}`}
              className="w-full h-32 object-cover rounded"
            />
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              #{design.id}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for showing image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded p-4 shadow-md">
            <img
              src={selectedImage}
              alt="Selected Design"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="flex justify-between mt-4">
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={handleCloseModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => downloadOutputImage(selectedImage)}>
                <Download />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedDesigns;

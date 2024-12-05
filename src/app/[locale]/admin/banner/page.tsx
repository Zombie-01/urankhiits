"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { supabase } from "../../../../../utils/supabase/client";

interface Banner {
  title: string;
  desc: string;
}

interface SubBanner {
  id: string;
  banner_id: string;
  img_url: string;
}

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [subBanners, setSubBanners] = useState<SubBanner[]>([]);

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [newImages, setNewImages] = useState<File[]>([]);

  // Fetch banners and sub-banners
  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase.from("banner").select("*");
      if (error) {
        console.error("Error fetching banners:", error.message);
      } else {
        setBanners(data as unknown as Banner[]);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (selectedBanner) {
      const fetchSubBanners = async () => {
        const { data, error } = await supabase
          .from("sub_banner")
          .select("*")
          .eq("banner_id", (selectedBanner as any).id);
        if (error) {
          console.error("Error fetching sub-banners:", error.message);
        } else {
          setSubBanners(data as unknown as SubBanner[]);
        }
      };

      fetchSubBanners();
    }
  }, [selectedBanner]);

  // Add new banner
  const handleAddBanner = async () => {
    const { error } = await supabase
      .from("banner")
      .insert([{ title, description: desc }]);
    if (error) {
      console.error("Error adding banner:", error.message);
    } else {
      setBanners([...banners, { title, desc }]);
      setTitle("");
      setDesc("");
    }
  };

  // Add new sub-banners
  const handleAddSubBanners = async () => {
    if (!selectedBanner) return;

    const uploads = newImages.map(async (image) => {
      const fileName = `${nanoid()}-${image.name}`;
      const { error: storageError } = await supabase.storage
        .from("projects")
        .upload(fileName, image);

      if (storageError) {
        console.error(
          "Error uploading sub-banner image:",
          storageError.message
        );
        return null;
      }

      const { data: publicURL } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      //   if (urlError) {
      //     console.error("Error getting public URL:", urlError.message);
      //     return null;
      //   }

      return {
        id: nanoid(),
        banner_id: (selectedBanner as any).id,
        img_url: publicURL
      };
    });

    const subBannerData = (await Promise.all(uploads)).filter(
      (item) => item !== null
    ) as unknown as SubBanner[];

    const { error } = await supabase.from("sub_banner").insert(subBannerData);
    if (error) {
      console.error("Error adding sub-banners:", error.message);
    } else {
      setSubBanners([...subBanners, ...subBannerData]);
      setNewImages([]);
    }
  };

  return (
    <div className="p-6">
      {selectedBanner ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            Sub-Banners for {selectedBanner.title}
          </h2>
          <button
            className="text-blue-500 mb-4"
            onClick={() => setSelectedBanner(null)}>
            Back to Banners
          </button>
          <div className="grid grid-cols-3 gap-4">
            {subBanners.map((subBanner) => (
              <div key={subBanner.id}>
                <img
                  src={subBanner.img_url}
                  alt={`Sub-Banner ${subBanner.id}`}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Add Sub-Banners</h3>
            <input
              type="file"
              multiple
              onChange={(e) =>
                setNewImages(e.target.files ? Array.from(e.target.files) : [])
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={handleAddSubBanners}>
              Add Images
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Banners</h2>
          <div className="grid grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div
                key={(banner as any).id}
                className="border p-4 cursor-pointer"
                onClick={() => setSelectedBanner(banner)}>
                <h3 className="text-lg font-bold">{banner.title}</h3>
                <p>{banner.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Add New Banner</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddBanner}>
              Add Banner
            </button>
          </div>
        </>
      )}
    </div>
  );
}

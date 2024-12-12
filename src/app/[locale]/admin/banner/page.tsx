"use client";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { supabase } from "../../../../../utils/supabase/client";

interface Banner {
  id: string;
  title: string;
  desc: string;
}

interface SubBanner {
  id: string;
  banner_id: string;
  image_url: string;
}

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [subBanners, setSubBanners] = useState<SubBanner[]>([]);

  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [subdesc, setSubDesc] = useState<string>("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch banners
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

  // Fetch sub-banners
  useEffect(() => {
    if (selectedBanner) {
      const fetchSubBanners = async () => {
        const { data, error } = await supabase
          .from("sub_banner")
          .select("*")
          .eq("banner_id", selectedBanner.id);
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
    const { data, error } = await supabase
      .from("banner")
      .insert([{ title, description: desc }])
      .select();
    if (error) {
      console.error("Error adding banner:", error.message);
    } else if (data) {
      setBanners([...(banners as any), data[0]]);
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
        .from("sub_banner")
        .upload(fileName, image);

      if (storageError) {
        console.error(
          "Error uploading sub-banner image:",
          storageError.message
        );
        return null;
      }

      const { data: publicURL } = supabase.storage
        .from("sub_banner")
        .getPublicUrl(fileName);

      return {
        banner_id: selectedBanner.id,
        image_url: publicURL.publicUrl,
        link_url: publicURL.publicUrl,
        title: subtitle,
        desc: subdesc
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

  // Delete a sub-banner
  const handleDeleteSubBanner = async (subBannerId: string) => {
    const { error } = await supabase
      .from("sub_banner")
      .delete()
      .eq("id", subBannerId);

    if (error) {
      console.error("Error deleting sub-banner:", error.message);
    } else {
      setSubBanners(
        subBanners.filter((subBanner) => subBanner.id !== subBannerId)
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Banners</h2>
      <div className="grid grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="border p-4 cursor-pointer"
            onClick={() => {
              setSelectedBanner(banner);
              setIsModalOpen(true);
            }}>
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

      {/* Sub-Banners Modal */}
      {isModalOpen && selectedBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <h2 className="text-xl font-bold mb-4">
              Sub-Banners for {selectedBanner.title}
            </h2>
            <button
              className="text-red-500 mb-4"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedBanner(null);
              }}>
              Close
            </button>
            <div className="grid grid-cols-3 gap-4">
              {subBanners.map((subBanner) => (
                <div key={subBanner.id}>
                  <img
                    src={subBanner.image_url}
                    alt={`Sub-Banner ${subBanner.id}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    onClick={() => handleDeleteSubBanner(subBanner.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Add Sub-Banners</h3>
              <input
                type="file"
                onChange={(e) =>
                  setNewImages(e.target.files ? Array.from(e.target.files) : [])
                }
              />
              <input
                type="text"
                placeholder="Title"
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <textarea
                placeholder="Description"
                value={subdesc}
                onChange={(e) => setSubDesc(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={handleAddSubBanners}>
                Add Images
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

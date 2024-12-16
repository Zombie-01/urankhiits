"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import { supabase } from "../../../../utils/supabase/client";
import { useLocale, useTranslations } from "next-intl";

const rooms = [
  {
    title: "Living Room",
    label: {
      en: "Living Room",
      mn: "Том өрөө"
    },
    image: "/rooms/Living Room.png",
    buildingType: "Residential"
  },

  {
    title: "Bedroom",
    label: {
      en: "Bedroom",
      mn: "Унтлагын өрөө"
    },
    image: "/rooms/Bedroom.jpg",
    buildingType: "Residential"
  },
  {
    title: "Bathroom",
    label: {
      en: "Bathroom",
      mn: "Угаалгын өрөө"
    },
    image: "/rooms/Bathroom.jpg",
    buildingType: "Residential"
  },
  {
    title: "Office",
    label: {
      en: "Office",
      mn: "Оффис"
    },
    image: "/rooms/Office.png",
    buildingType: "Commercial"
  },
  {
    title: "Kitchen",
    label: {
      en: "Kitchen",
      mn: "Гал тогоо"
    },
    image: "/rooms/Kitchen.png",
    buildingType: "Residential"
  },
  {
    title: "Retail",
    label: {
      en: "Retail",
      mn: "Худалдаа"
    },
    image: "/rooms/Retail.jpg",
    buildingType: "Commercial"
  },
  {
    title: "Restaurant",
    label: {
      en: "Restaurant",
      mn: "Ресторан"
    },
    image: "/rooms/Restaurant.png",
    buildingType: "Commercial"
  },
  {
    title: "Warehouse",
    label: {
      en: "Warehouse",
      mn: "Агуулах"
    },
    image: "/rooms/Warehouse.jpg",
    buildingType: "Commercial"
  },
  {
    title: "Garden",
    label: {
      en: "Garden",
      mn: "Цэцэрлэг"
    },
    image: "/rooms/Garden.jpg",
    buildingType: "Exterior"
  },
  {
    title: "Patio",
    label: {
      en: "Patio",
      mn: "Патио"
    },
    image: "/rooms/Patio.jpeg",
    buildingType: "Exterior"
  },
  {
    title: "Pool",
    label: {
      en: "Pool",
      mn: "Усан сан"
    },
    image: "/rooms/Pool.jpg",
    buildingType: "Exterior"
  },
  {
    title: "Parking",
    label: {
      en: "Parking",
      mn: "Паркинг"
    },
    image: "/rooms/Parking.jpg",
    buildingType: "Exterior"
  },
  {
    title: "Other",
    label: {
      en: "Other",
      mn: "Бусад"
    },
    image: "/rooms/Other.jpg",
    buildingType: "Residential"
  }
];

const building = [
  {
    name: "Residential",
    mn: "Амины орон сууц",
    en: "Residential"
  },
  {
    name: "Commercial",
    mn: "Аж ахуйн",
    en: "Commercial"
  },
  {
    name: "Exterior",
    mn: "Гадна талбай",
    en: "Exterior"
  }
];

const buildingTypes = {
  Residential: [
    "Living Room",
    "Bathroom",
    "Kitchen",
    "Bedroom",
    "Bathroom",
    "Kitchen",
    "Other"
  ],
  Commercial: ["Retail", "Restaurant", "Warehouse", "Office", "Other"],
  Exterior: ["Garden", "Patio", "Pool", "Parking", "Other"]
};

const tems = [
  {
    label: {
      en: "Minimalist",
      mn: "Энгийн"
    },
    value: "minimalist",
    selected: false
  },
  {
    label: {
      en: "Classic",
      mn: "Классик"
    },
    value: "classic",
    selected: false
  },
  {
    label: {
      en: "Modern",
      mn: "Орчин үеийн"
    },
    value: "modern",
    selected: true
  },
  {
    label: {
      en: "Mid-Century Modern",
      mn: "Дундад зууны үеийн"
    },
    value: "mid_century_modern",
    selected: false
  },
  {
    label: {
      en: "Contemporary",
      mn: "Орчин үеийн"
    },
    value: "contemporary",
    selected: false
  },
  {
    label: {
      en: "Art Deco",
      mn: "Урлагийн декор"
    },
    value: "art_deco",
    selected: false
  },
  {
    label: {
      en: "Eclectic",
      mn: "Төрөл бүрийн"
    },
    value: "eclectic",
    selected: false
  }
];

function getRoomsByBuildingType(buildingType: string) {
  if (!(buildingTypes as any)[buildingType]) {
    return []; // Return empty array if buildingType is invalid
  }

  // Filter rooms based on the selected building type
  return rooms.filter((room) =>
    (buildingTypes as any)[buildingType].includes(room.title)
  );
}

export default function ImagePage() {
  const [isLoading, setLoading] = useState(false);
  const [theme, setTheme] = useState<string>("Modern Minimalist");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [them, setThem] = useState<string>(tems[0].label?.en);
  const [room, setRoom] = useState<{ title: string; image: string }>(rooms[0]);
  const [build, setBuild] = useState<string>(building[0].name);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const t = useTranslations("AI");
  const intl = useLocale();

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

  async function handleGmailLogin() {
    try {
      // Get the current session to check if the user is already logged in
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError);
        toast.error("Failed to get session");
        return false;
      }

      if (session?.user) {
        // If the user is already logged in, no need to log them in again
        console.log("User already logged in:", session.user);

        // Check if the user already has an entry in the user_log table
        const { data: existingLog, error: logError } = await supabase
          .from("user_log")
          .select("id, remain_token")
          .eq("user_id", session.user.id);

        if (logError) {
          console.error("Error checking user log:", logError.message);
          toast.error("Failed to check user log.");
          return false;
        }
        console.log(existingLog);
        if (existingLog?.length > 0) {
          // If the user already has a log entry, don't create a new one
          console.log("User already has a log entry:", existingLog);
          if ((existingLog[0] as any).remain_token === 0) {
            alert("Your tokens are out of stock. Please purchase");
            return false;
          }
          const updatedToken = (existingLog[0] as any).remain_token - 1;

          // Update the remain_token by decrementing it by 1
          const { error: updateError } = await supabase
            .from("user_log")
            .update({ remain_token: updatedToken })
            .eq("user_id", session.user.id);

          if (updateError) {
            console.error("Error updating user log:", updateError.message);
            toast.error("Failed to update user log entry.");
          } else {
            console.log("User log entry updated successfully.");
            toast.success("Remain token updated!");
          }
          return session.user.id;
        }

        console.log(session.user.id);

        // If no log entry exists, create a new log entry
        const { error: insertError } = await supabase
          .from("user_log")
          .insert([{ remain_token: 2 }]);

        if (insertError) {
          console.error("Error adding to user_log:", insertError.message);
          toast.error("Failed to create user log entry.");
        } else {
          console.log("User log entry added successfully.");
          toast.success("Logged in and user log created!");
        }

        return session.user.id;
      }

      // If no session exists, proceed with Gmail login
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google"
      });

      if (error) {
        console.error("Gmail login error:", error.message);
        toast.error("Failed to log in with Gmail");
        return false;
      }

      return false; // If no session or user is returned, return false
    } catch (error) {
      console.error("Unexpected error during Gmail login:", error);
      toast.error("Unexpected error during Gmail login");
      return false;
    }
  }

  async function submitImage(): Promise<void> {
    try {
      if (!file) {
        toast.error("Please upload an image.");
        return;
      }

      const loggedIn = await handleGmailLogin();
      console.log(loggedIn);
      if (!loggedIn) return;

      setLoading(true);

      // Call the API to process the image
      const response = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: base64Image,
          theme,
          them,
          room: room.title
        })
      });

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
        toast.error(result.error);
        return;
      }

      if (result.output) {
        setOutputImage(result.output);

        // Fetch the generated image file from the URL
        const resSt = await fetch(result.output);
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
          prompt: `A ${theme} ${room} Editorial Style Photo, Symmetry, Straight On, Modern Living Room, Large Window (balanced with walls if window not detected then don't add window), Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
          user: loggedIn || null // Add user ID or null if unavailable
        });

        if (dbError) {
          console.error("Error saving metadata:", dbError.message);
          toast.error(t("image_processing_error"));
          return;
        }

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
        <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className=" mb-4 dark:text-white">
            1. {t("choose_building_type")}
          </h2>
          <div className="flex flex-wrap gap-4">
            {building.map((type) => (
              <button
                onClick={() => setBuild(type?.name)}
                key={type?.name}
                className={`items-center w-full sm:w-auto relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  build === type?.name ? "border-2 border-blue-600" : ""
                }`}>
                {(type as any)[intl]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className="mb-4 dark:text-white">2. {t("choose_room_type")}</h2>
          <div className="flex  gap-4 py-2 overflow-auto max-w-full">
            {getRoomsByBuildingType(build).map((r) => (
              <div
                key={r.title}
                onClick={() => setRoom(r)}
                className={`items-center relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  room === r ? "border-2 border-blue-600" : ""
                }`}>
                <img
                  src={r.image}
                  alt="hero"
                  className="w-full h-full max-h-[200px] object-cover aspect-video"
                />
                <span className="text-white bg-black bg-opacity-30 absolute bottom-4 left-4 ">
                  {(r.label as any)[intl]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
          <h2 className=" mb-4 dark:text-white">3. {t("choose_theme_type")}</h2>
          <div className="flex gap-4 py-2 overflow-auto max-w-full">
            {tems.map((type) => (
              <button
                onClick={() => setThem(type?.label?.en)}
                key={type?.label?.en}
                className={`items-center w-full sm:w-auto relative min-w-[200px] overflow-hidden rounded-md shadow-md bg-white dark:bg-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  them === type?.label?.en ? "border-2 border-blue-600" : ""
                }`}>
                {(type?.label as any)[intl]}
              </button>
            ))}
          </div>
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
            <div className="bg-gray-200 dark:bg-white/10 rounded-lg flex items-start justify-center p-4 flex-col">
              <h2 className="mb-4">5. {t("choose_color_tone")}</h2>
              {/* Dropdown button */}
              <button
                className="w-full flex justify-between items-center border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {theme || "Select a Theme"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute z-[999] mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg grid grid-cols-5 gap-4 justify-around">
                  {[
                    {
                      label: "Modern Minimalist",
                      colors: ["#ffffff", "#cccccc", "#333333"],
                      colorNames: "white, light gray, dark gray"
                    },
                    {
                      label: "Scandinavian",
                      colors: ["#f4f4f4", "#d9c7b7", "#8d7b6a"],
                      colorNames: "off-white, beige, brown"
                    },
                    {
                      label: "Industrial",
                      colors: ["#2e2e2e", "#737373", "#d6cfc7"],
                      colorNames: "charcoal, gray, ivory"
                    },
                    {
                      label: "Bohemian",
                      colors: ["#b57f50", "#f5e3d3", "#a86b5a"],
                      colorNames: "tan, peach, brown"
                    },
                    {
                      label: "Coastal",
                      colors: ["#d8f1f2", "#86a8d1", "#f5f5dc"],
                      colorNames: "aqua, blue, beige"
                    },
                    {
                      label: "Rustic Farmhouse",
                      colors: ["#dbd3c9", "#796d5a", "#bca580"],
                      colorNames: "cream, taupe, brown"
                    },
                    {
                      label: "Mid-Century Modern",
                      colors: ["#ff6f61", "#fde1a9", "#5b5b5b"],
                      colorNames: "coral, cream, gray"
                    },
                    {
                      label: "Victorian",
                      colors: ["#543f6f", "#9a8a97", "#e9d8c9"],
                      colorNames: "purple, lavender, cream"
                    },
                    {
                      label: "Art Deco",
                      colors: ["#f7d8ba", "#ac7339", "#3a3a52"],
                      colorNames: "beige, bronze, navy blue"
                    },
                    {
                      label: "Tropical",
                      colors: ["#2e8b57", "#f3e2a9", "#ff6347"],
                      colorNames: "green, sand, tomato red"
                    },
                    {
                      label: "Luxury Modern",
                      colors: ["#282c34", "#b4975a", "#ece9e4"],
                      colorNames: "dark gray, gold, ivory"
                    },
                    {
                      label: "Zen Japanese",
                      colors: ["#f4efe6", "#847462", "#d2b48c"],
                      colorNames: "cream, brown, tan"
                    },
                    {
                      label: "Contemporary",
                      colors: ["#4a4a4a", "#a3a3a3", "#f7f7f7"],
                      colorNames: "charcoal, silver, white"
                    },
                    {
                      label: "Mediterranean",
                      colors: ["#3f88c5", "#f6a623", "#f3eacb"],
                      colorNames: "blue, gold, beige"
                    },
                    {
                      label: "Desert Chic",
                      colors: ["#c28e6c", "#f4e2b8", "#736f4c"],
                      colorNames: "sand, cream, brown"
                    },
                    {
                      label: "Urban Jungle",
                      colors: ["#4c956c", "#cddcab", "#3e403f"],
                      colorNames: "green, sage, charcoal"
                    },
                    {
                      label: "Futuristic",
                      colors: ["#232323", "#7a7a7a", "#e8e8e8"],
                      colorNames: "black, gray, white"
                    },
                    {
                      label: "Eclectic",
                      colors: ["#faae42", "#55828b", "#d9d9d9"],
                      colorNames: "orange, blue, gray"
                    },
                    {
                      label: "Retro",
                      colors: ["#ed6a5a", "#f4f1bb", "#9bc1bc"],
                      colorNames: "red, yellow, teal"
                    },
                    {
                      label: "Warm Neutrals",
                      colors: ["#b39c94", "#e3d5ca", "#ffffff"],
                      colorNames: "brown, beige, white"
                    }
                  ].map((themes, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setTheme(themes.label);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex flex-col gap-2 max-w-[50px] border w-full rounded-md p-2 md:p-4 transition-transform transform hover:scale-105 cursor-pointer ${
                        themes.label === theme
                          ? "border-black dark:border-white"
                          : "border-gray-300"
                      }`}>
                      {themes.colors.map((color, i) => (
                        <div
                          key={i}
                          className="h-5 w-5 rounded"
                          style={{ backgroundColor: color }}></div>
                      ))}
                    </div>
                  ))}
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

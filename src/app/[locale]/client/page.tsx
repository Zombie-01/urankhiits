"use client";
// pages/generated-designs.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";

const GeneratedDesigns = () => {
  const [user, setUser] = useState<any>(null);
  const [generatedDesigns, setGeneratedDesigns] = useState<any[]>([]);

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
      // Fetch the user's token from the user_log table

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {generatedDesigns.map((design) => (
          <div
            key={design.id}
            className="relative p-2 border rounded bg-white shadow">
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
    </div>
  );
};

export default GeneratedDesigns;

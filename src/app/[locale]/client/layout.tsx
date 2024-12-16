"use client";
// src/app/components/Layout.tsx
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { supabase } from "../../../../utils/supabase/client";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [remainToken, setRemainToken] = useState<number>(0);
  const [generatedDesigns, setGeneratedDesigns] = useState<any[]>([]);
  const router = useRouter();

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
      const fetchUserLog = async () => {
        const { data, error } = await supabase
          .from("user_log")
          .select("remain_token")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching user log:", error.message);
        } else {
          if (data?.length > 0) {
            setRemainToken((data[0] as any)?.remain_token || 0);
          } else {
            setRemainToken(2);
          }
        }
      };

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

      fetchUserLog();
      fetchGeneratedDesigns();
    }
  }, [user]);

  return (
    <div className="flex h-screen lg:pt-[81px] ">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-y-auto gap-8 sm:gap-10 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <div className="space-x-4">
              <div className="inline-block p-4 bg-white/10 shadow rounded">
                <h3 className="text-xl font-bold">Your Generated Designs</h3>
                <p className="text-4xl font-bold text-center">
                  {generatedDesigns.length}
                </p>
              </div>
              <div className="inline-block p-4 bg-white/10 shadow rounded">
                <h3 className="text-xl font-bold">Your Tokens</h3>
                <p className="text-4xl font-bold text-center">{remainToken}</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded shadow">
            Buy Package
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;

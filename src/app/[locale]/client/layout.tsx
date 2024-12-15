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
  const router = useRouter();

  useEffect(() => {
    // Get the logged-in user when the component mounts
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        return setUser(session?.user);
      }
    );
  }, []);

  return (
    <div className="flex h-screen lg:pt-[81px] ">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-y-auto gap-8 sm:gap-10 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            <div className="inline-block p-4 bg-white/10 shadow rounded">
              <h3 className="text-xl font-bold">Your Generated Designs</h3>
              <p className="text-4xl font-bold text-center">545</p>
            </div>
            <div className="inline-block p-4 bg-white/10 shadow rounded">
              <h3 className="text-xl font-bold">Your Tokens</h3>
              <p className="text-4xl font-bold text-center">44</p>
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

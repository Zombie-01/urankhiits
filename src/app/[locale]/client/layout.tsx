"use client";
// src/app/components/Layout.tsx
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { supabase } from "../../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const t = useTranslations("CLIENT"); // Use 'common' namespace for translations
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
    <div className="flex h-screen pt-[65px] lg:pt-[81px] ">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-y-auto  gap-8 sm:gap-10 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-between w-full items-center">
            <div className="space-y-4 md:space-y-4  md:space-x-4">
              <div className="inline-block p-4 bg-white/10 w-full md:w-auto shadow rounded">
                <h3 className="text-xl font-bold">
                  {t("yourGeneratedDesigns")}
                </h3>{" "}
                <p className="text-4xl font-bold text-center">
                  {generatedDesigns.length}
                </p>
              </div>
              <div className="inline-block p-4 bg-white/10 w-full md:w-auto shadow rounded">
                <h3 className="text-xl font-bold">{t("yourTokens")}</h3>{" "}
                {/* Use translation key */}
                <p className="text-4xl font-bold text-center">{remainToken}</p>
              </div>
            </div>
            <Link
              href="/client#contact"
              className="inline-block p-4 h-full bg-white/10 w-full md:w-auto shadow rounded">
              <h3 className="text-xl font-bold">{t("CONTACT")}</h3>{" "}
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;

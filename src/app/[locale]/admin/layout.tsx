"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { Link } from "@/i18n/routing";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data?.user);
      } else {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-lg font-semibold border-b border-gray-700">
              Admin Panel
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link
                href="/admin"
                className="block px-4 py-2 rounded hover:bg-gray-700">
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className="block px-4 py-2 rounded hover:bg-gray-700">
                Projects
              </Link>
              <Link
                href="/admin/banner"
                className="block px-4 py-2 rounded hover:bg-gray-700">
                Banners
              </Link>
              <Link
                href="/admin/generated"
                className="block px-4 py-2 rounded hover:bg-gray-700">
                Generated
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-700">
              {user ? (
                <button
                  onClick={() => (window.location.href = "/admin/profile")}
                  className="block px-4 py-2 text-sm text-gray-400 hover:text-white">
                  {user.email}
                </button>
              ) : (
                <p className="text-sm text-gray-400">Loading...</p>
              )}
              <Link
                href="#"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.reload();
                }}
                className="block mt-2 px-4 py-2 text-sm text-gray-400 hover:text-white">
                Logout
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

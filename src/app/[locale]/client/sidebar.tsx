"use client";
// components/Sidebar.tsx

import React, { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

const Sidebar = ({ user }: { user: User }) => {
  const t = useTranslations("CLIENT"); // Use 'common' namespace for translations
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`lg:hidden fixed left-4  z-50 bg-gray-800 text-white px-3 py-2 rounded ${
          isOpen ? "bottom-4" : "top-1/2"
        }`}
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"} {/* Toggle between X and burger menu */}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative  top-0 left-0 h-screen lg:h-full w-64 rounded-r-3xl bg-[#c6c6c6] dark:bg-[#c6c6c6]/10 p-4 shadow-md z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}>
        <div className="flex flex-col items-center">
          <img
            src={user?.user_metadata?.avatar_url}
            className="w-16 h-16 rounded-full bg-gray-400 mb-2"
          />
          <h2 className="text-lg font-bold">{user?.user_metadata?.name}</h2>
        </div>
        <nav className="mt-8 space-y-2">
          <Link href="/client">
            <p
              className={`block py-2 px-4 rounded ${
                path === "/client" ? "bg-gray-300 font-bold" : ""
              }`}>
              {t("yourGeneratedDesigns")} {/* Use translation key */}
            </p>
          </Link>
          <Link href="/client/account">
            <p
              className={`block py-2 px-4 rounded ${
                path === "/client/account" ? "bg-gray-300 font-bold" : ""
              }`}>
              {t("accountInformation")} {/* Use translation key */}
            </p>
          </Link>
          {/* <Link href="/client/billing">
            <p
              className={`block py-2 px-4 rounded ${
                path === "/client/billing" ? "bg-gray-300 font-bold" : ""
              }`}>
              {t("yourBillingInformation")} 
            </p>
          </Link> */}
          <button className="w-full block text-left py-2 px-4 bg-red-500 text-white rounded mt-4">
            {t("logOut")} {/* Use translation key */}
          </button>
        </nav>
      </aside>

      {/* Overlay when Sidebar is open (for mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

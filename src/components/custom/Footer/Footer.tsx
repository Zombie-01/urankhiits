import Logo from "@/app/[locale]/logo";
import { Link } from "@/i18n/routing";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import * as React from "react";

export const Footer: React.FC = () => {
  const t = useTranslations("Header");
  const links = [
    { label: t("OURSERVICE"), href: "#ourservice" },
    { label: t("AI"), href: "/ai" },
    { label: t("ABOUTUS"), href: "#aboutus" },
    { label: t("PROJECTS"), href: "/project" }
  ];

  const contactItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5044eee29a31341c92cf85a35705273289c27b35fd71a1351da339183bdb68e3?placeholderIfAbsent=true&apiKey=d78a1b03472d480d89d70a3b96288448",
      text: t("PIN"),
      alt: "Location icon"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b89780b9e008086491f43008cfb340e20def4ccccf0691e6017e86cc71eace3e?placeholderIfAbsent=true&apiKey=d78a1b03472d480d89d70a3b96288448",
      text: "+976 9901-2105",
      alt: "Phone icon"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/67aff6e3f3dfaa4c32c119a23cb5e5301c5423f3de6e11007614e455e6c56130?placeholderIfAbsent=true&apiKey=d78a1b03472d480d89d70a3b96288448",
      text: "info@urankhiits.com",
      alt: "Email icon"
    }
  ];
  return (
    <div className="flex overflow-hidden max-w-screen flex-col md:flex-row gap-10 items-end pt-20 md:pr-20 pb-11 bg-neutral-200 dark:bg-neutral-200/10 md:max-md:pr-5">
      {/* Left Section */}
      <div className="flex flex-col self-start text-base font-medium tracking-normal leading-6 text-neutral-500 max-md:max-w-full">
        <div className="flex gap-6 self-start mx-4 md:mx-0 md:ml-24 items-center">
          <Logo />
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1b934728425ff9a32b03fde52258b8ffb49a379d998f87980ce43ea97db3252a?placeholderIfAbsent=true&apiKey=d78a1b03472d480d89d70a3b96288448"
          alt="Design banner"
          className="object-contain mt-12 w-full aspect-[10.53] max-md:mt-10 max-md:max-w-full"
        />
      </div>

      <div className="flex flex-col px-4 md:px-0 md:flex-row w-full gap-10 max-w-3xl mx-auto">
        {/* Links Section */}
        <div className="flex flex-col mt-6 text-base font-semibold tracking-wide text-zinc-800 dark:text-white">
          <div className="leading-none">{t("MENU")}</div>
          <div className="flex flex-col mt-6 leading-5 min-h-[192px] max-md:mr-1.5">
            {links.map((link, index) => (
              <Link href={link.href} key={index} className="mt-4">
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact & Social Icons Section */}
        <div id="contact" className="flex flex-col mt-6">
          <div className="flex flex-col text-base">
            <div className="font-semibold tracking-wide leading-none text-zinc-800 dark:text-white">
              {t("CONTACT")}
            </div>
            <div className="flex flex-col items-start mt-4 tracking-normal text-neutral-500">
              {contactItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2 justify-center items-center mt-2">
                  <img
                    loading="lazy"
                    src={item.icon}
                    alt={item.alt}
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                  />
                  <div className="self-stretch my-auto">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-2 text-[#727272]">
            <a
              href="https://www.facebook.com/profile.php?id=61564822048185"
              target="_blank"
              aria-label="Facebook">
              <IconBrandFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/urankhiits.llc?"
              target="_blank"
              aria-label="Instagram">
              <IconBrandInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/uran-khiits-llc"
              target="_blank"
              aria-label="LinkedIn">
              <IconBrandLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

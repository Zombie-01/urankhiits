import type { Metadata } from "next";
import localFont from "next/font/local";
import { Six_Caps, Poppins } from "next/font/google";
import "./globals.css";
import FloatingDockDemo from "@/components/example/floating-dock-demo";
import TypewriterLoader from "./loader";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./logo";
import Header from "@/components/custom/header";
import { Footer } from "@/components/custom/Footer/Footer";
import FooterHero from "@/components/custom/Footer/FooterHero";

// AeonikTRIAL Regular
const aeonikRegular = localFont({
  src: "./fonts/AeonikTRIAL-Regular.otf",
  variable: "--font-aeonik-regular",
  weight: "400", // Regular weight
});

// AeonikTRIAL Bold
const aeonikBold = localFont({
  src: "./fonts/AeonikTRIAL-Bold.otf",
  variable: "--font-aeonik-bold",
  weight: "700", // Bold weight
});

// AeonikTRIAL Regular Italic
const aeonikItalic = localFont({
  src: "./fonts/AeonikTRIAL-RegularItalic.otf",
  variable: "--font-aeonik-italic",
  weight: "400", // Italic version of Regular weight
});

// AeonikTRIAL Bold Italic
const aeonikBoldItalic = localFont({
  src: "./fonts/AeonikTRIAL-BoldItalic.otf",
  variable: "--font-aeonik-bold-italic",
  weight: "700", // Italic version of Bold weight
});

// AeonikTRIAL Light
const aeonikLight = localFont({
  src: "./fonts/AeonikTRIAL-Light.otf",
  variable: "--font-aeonik-light",
  weight: "300", // Light weight
});

// AeonikTRIAL Light Italic
const aeonikLightItalic = localFont({
  src: "./fonts/AeonikTRIAL-LightItalic.otf",
  variable: "--font-aeonik-light-italic",
  weight: "300", // Italic version of Light weight
});
export const metadata: Metadata = {
  title: "Urankhiits | Design",
  description: "Urankhiits .",
  keywords: "Urankhiits, ai generate, ai, generate image, iterior, ai interior",
};

const six_caps = Six_Caps({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-six-caps",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aeonikRegular.variable} ${six_caps.variable} ${poppins.variable} ${aeonikBold.variable} ${aeonikItalic.variable} ${aeonikBoldItalic.variable} ${aeonikLight.variable} ${aeonikLightItalic.variable} antialiased dark:bg-black dark:text-white relative`}>
        <Header />
        {children}
        {/* <footer className="">
          <div className="container mx-auto pt-10 text-center">
            <FloatingDockDemo />
          </div>
          <div className="py-10 text-center">
            <p className="text-xs  text-[#7D7F83] dark:text-white/70">
              © Copyright {new Date().getFullYear()}, All Rights Reserved by
              URANKHIITS
            </p>
          </div>
        </footer> */}
        <Footer />
      </body>
    </html>
  );
}

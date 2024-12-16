import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Watch files in src/app
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) linear infinite var(--animation-direction, normal)"
      },
      keyframes: {
        scroll: {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      fontFamily: {
        aeonik: ["var(--font-aeonik-regular)", "sans-serif"],
        aeonikBold: ["var(--font-aeonik-bold)", "sans-serif"],
        aeonikItalic: ["var(--font-aeonik-italic)", "sans-serif"],
        aeonikBoldItalic: ["var(--font-aeonik-bold-italic)", "sans-serif"],
        aeonikLight: ["var(--font-aeonik-light)", "sans-serif"],
        aeonikLightItalic: ["var(--font-aeonik-light-italic)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        caps: ["var(--font-six-caps)", "cursive"],
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;

import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // Light mode colors
    "bg-blue-100",
    "bg-purple-100",
    "bg-green-100",
    "bg-red-100",
    "bg-emerald-100",
    "bg-cyan-100",
    "text-blue-500",
    "text-purple-500",
    "text-green-500",
    "text-red-500",
    "text-emerald-500",
    "text-cyan-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-red-500",
    "bg-emerald-500",
    "bg-cyan-500",

    // Dark mode colors
    "dark:bg-blue-900/20",
    "dark:bg-purple-900/20",
    "dark:bg-green-900/20",
    "dark:bg-red-900/20",
    "dark:bg-emerald-900/20",
    "dark:bg-cyan-900/20",
    "dark:text-blue-400",
    "dark:text-purple-400",
    "dark:text-green-400",
    "dark:text-red-400",
    "dark:text-emerald-400",
    "dark:text-cyan-400",
    "dark:bg-blue-400",
    "dark:bg-purple-400",
    "dark:bg-green-400",
    "dark:bg-red-400",
    "dark:bg-emerald-400",
    "dark:bg-cyan-400",
  ],
} satisfies Config

export default config

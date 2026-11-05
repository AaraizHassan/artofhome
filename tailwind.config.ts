import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",

        "primary-accent": "var(--primary-accent)",
        "foreground-accent": "var(--foreground-accent)",
        "hero-background": "var(--hero-background)",

        burgundy: "var(--deep-burgundy)",
        "deep-burgundy": "var(--deep-burgundy)",
        "soft-clay": "var(--soft-clay)",
        "blush-rose": "var(--blush-rose)",
        "warm-cream": "var(--warm-cream)",
        gold: {
          50: "#FAF7EE",
          100: "#F3ECD9",
          200: "#E6D7B4",
          300: "#D7BF8C",
          400: "#C8A766",
          500: "#B89045",
          600: "#9C7631",
          700: "#7A5925",
        },
      },
    },
  },
  plugins: [],
};
export default config;

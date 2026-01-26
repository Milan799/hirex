import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- Quotes ("") me hona chahiye, Array ([]) me nahi
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Yaha kuch bhi extra na ho toh behtar hai abhi ke liye
    },
  },
  plugins: [],
};
export default config;
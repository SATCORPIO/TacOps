import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#9F8750",
        "alert-red": "#5E0B12",
        "active-red": "#7A0C14",
        "panel-bg": "#0B0F14",
        "primary-bg": "#050507",
      },
      fontFamily: {
        mono: ["'Courier New'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

// Tokens do Sistema de Design DRO (Manual de Identidade Ed. 01/2025) + cor-assinatura da consultoria (verde-oliveira).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        navy: { DEFAULT: "#082533", 500: "#143A4F", 700: "#081B26" },
        gold: { DEFAULT: "#CCAB76", 600: "#9A7635" },
        cream: "#EFEBE6",
        paper: "#F6F4EF",
        slate: "#54636C",
        ink: "#1A1A1A",
        oliva: { DEFAULT: "#5C7052", 300: "#A9B79E", 700: "#3E5237" },
        ok: "#3E7C5A", warn: "#B8862F", err: "#B23B3B", info: "#2F6D8C",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Roboto", "Arial", "sans-serif"],
      },
      borderRadius: { field: "2px", DEFAULT: "6px", card: "8px" },
      maxWidth: { prose: "72ch" },
    },
  },
  plugins: [],
};
export default config;

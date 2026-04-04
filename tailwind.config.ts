import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores institucionais (Simulando UEMG/Portal Acadêmico)
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc4fb",
          400: "#37a4f7",
          500: "#0d8ae8",
          600: "#016fc4",
          700: "#02589f",
          800: "#064b83",
          900: "#0b406d",
          950: "#07284a",
        },
      },
    },
  },
  plugins: [],
};
export default config;

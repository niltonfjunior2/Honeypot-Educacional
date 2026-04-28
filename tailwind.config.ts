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
        "tertiary-fixed": "#dbe1ff",
        "error": "#ba1a1a",
        "on-secondary": "#ffffff",
        "on-secondary-fixed": "#002107",
        "primary-fixed": "#ffe243",
        "surface-variant": "#e5e2e1",
        "secondary-fixed": "#81fc90",
        "on-primary-fixed": "#211b00",
        "surface-container-highest": "#e5e2e1",
        "primary-fixed-dim": "#e3c600",
        "secondary-container": "#7ff98d",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-surface-variant": "#4c4732",
        "on-tertiary-container": "#445ead",
        "on-background": "#1c1b1b",
        "primary": {
          DEFAULT: "#6d5e00",
          50: "#fefce8",
          100: "#fef9c3",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207"
        },
        "on-surface": "#1c1b1b",
        "secondary-fixed-dim": "#65df76",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0edec",
        "on-error-container": "#93000a",
        "surface-tint": "#6d5e00",
        "primary-container": "#ffdf00",
        "on-secondary-container": "#007329",
        "surface": "#fcf9f8",
        "tertiary": "#405aa9",
        "on-primary-fixed-variant": "#524700",
        "surface-dim": "#dcd9d9",
        "on-secondary-fixed-variant": "#00531c",
        "surface-container-high": "#ebe7e7",
        "background": "#fcf9f8",
        "inverse-on-surface": "#f3f0ef",
        "secondary": "#006e27",
        "on-primary-container": "#716200",
        "outline-variant": "#cec6ab",
        "on-tertiary-fixed": "#00174d",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#d7deff",
        "inverse-primary": "#e3c600",
        "inverse-surface": "#313030",
        "tertiary-fixed-dim": "#b5c4ff",
        "on-tertiary-fixed-variant": "#25428f",
        "outline": "#7d775f",
        "surface-bright": "#fcf9f8",
        "on-primary": "#ffffff",
        "surface-container-lowest": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "sm": "12px",
        "xl": "80px",
        "lg": "48px",
        "xs": "4px",
        "gutter": "20px",
        "md": "24px",
        "base": "8px",
        "container-max": "1200px"
      },
      fontFamily: {
        "headline-md": ["Lexend", "sans-serif"],
        "cta-label": ["Lexend", "sans-serif"],
        "body-lg": ["Lexend", "sans-serif"],
        "label-bold": ["Space Grotesk", "sans-serif"],
        "display-xl": ["Lexend", "sans-serif"],
        "headline-lg": ["Lexend", "sans-serif"],
        "body-md": ["Lexend", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "cta-label": ["20px", { lineHeight: "1.0", fontWeight: "800" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-bold": ["14px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "700" }],
        "display-xl": ["72px", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "900" }],
        "headline-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
export default config;

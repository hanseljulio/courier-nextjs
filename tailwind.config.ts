import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "create-shipping": "url('/images/createshipping.png')",
        "view-shipping": "url('/images/viewshipping.png')",
        "create-address": "url('/images/createaddress.png')",
        "view-address": "url('/images/viewaddress.png')",
      },
      screens: {
        mobile: { max: "414px" },
      },
    },
  },
  plugins: [],
};
export default config;

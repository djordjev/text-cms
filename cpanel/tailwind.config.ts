import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "1x": "8px",
        "1xs": "4px",
        "2x": "16px",
        "2xs": "12px",
        "3x": "24px",
        "3xs": "20px",
        "4x": "32px",
        "4xs": "28px",
        "5x": "40px",
        "5xs": "36px",
        "6x": "48px",
        "6xs": "44px",
        "7x": "56px",
        "7xs": "52px",
        "8x": "64px",
        "8xs": "60px",
        "9x": "72px",
        "9xs": "68px",
        "10x": "80px",
        "10xs": "76px",
        "1z": "100px",
        "2z": "200px",
        "3z": "400px",
        "4z": "800px",
        "5z": "1200px",
        "6z": "1600px",
      },
    },
  },
  plugins: [],
  prefix: "u-",
} satisfies Config;

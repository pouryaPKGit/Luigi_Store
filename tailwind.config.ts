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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': "400px",
        '2xs': "550px",
      },
      keyframes: {
        spinOnce: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-once': 'spinOnce 1.5s ease-in-out forwards', // یک بار چرخش و توقف
      },
      backgroundImage: {
        'home-slider': "url('/images/home7-slider7.jpg')",
      },
    },
  },
  plugins: [
    
  ],
};

export default config;
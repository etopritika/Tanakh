import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "Arial", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        brown: {
          dark: "var(--brown-dark)",
          light: "var(--brown-light)",
        },
        white: "var(--white)",
        black: "var(--black)",
        text: "var(--text)",
        muted: "var(--muted)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

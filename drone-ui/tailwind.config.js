/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        panel: "#1e293b",
        accent: "#2563eb",
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#dc2626",
      },
    },
  },
  plugins: [],
};
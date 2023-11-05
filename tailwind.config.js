/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rtown-blue": "#162080",
        "rtown-yellow": "#fdd32b"
      },
    },
  },
  plugins: [],
  safelist: [
    "border",
    "border-collapse",
    "border-slate-500",
    "border-slate-700"
  ]
}
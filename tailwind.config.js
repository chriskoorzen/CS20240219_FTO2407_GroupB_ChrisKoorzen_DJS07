/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Variable text size for MemeText
    'text-xs',
    'text-base',
    'text-xl',
    'text-3xl',
    'text-5xl',
    'text-7xl',
    'text-9xl',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


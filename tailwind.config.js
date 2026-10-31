/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c0c0e",
        surface: "#141416",
        "surface-card": "#18181b",
        "surface-lighter": "#202024",
        border: "#27272a",
        gold: {
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          primary: "#FBBF24",
          accent: "#F59E0B",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 0 15px -3px rgba(251, 191, 36, 0.25)',
        'gold-md': '0 0 25px -2px rgba(251, 191, 36, 0.35)',
        'gold-lg': '0 0 40px 0px rgba(251, 191, 36, 0.25)',
        'card-glow': '0 8px 30px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
        'subtle-grid': "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}

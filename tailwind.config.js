/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#100e0b",
        surface: "#171410",
        "surface-card": "#1c1914",
        "surface-lighter": "#26221c",
        border: "rgba(245, 244, 241, 0.12)",
        paper: {
          DEFAULT: "#f5f4f1",
          warm: "#f0efed",
          dim: "#9b968f",
          muted: "#a39e96",
        },
        signal: {
          positive: "#3fbf7f",
          risk: "#e8674a",
        },
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
        sans: ["var(--font-geist)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-geist-mono)", "var(--font-jetbrains-mono)", "monospace"],
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

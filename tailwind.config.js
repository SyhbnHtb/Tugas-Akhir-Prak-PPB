/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Color + Animation Settings
      keyframes: {
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },

      animation: {
        floating: "floating 4s ease-in-out infinite",
        fadeIn: "fadeIn 1.2s ease-in-out forwards",
        fadeUp: "fadeUp 0.8s ease-out forwards",
      },

      // Shadows (opsional, untuk UI aesthetic)
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)",
        glow: "0 0 20px rgba(150,150,255,0.4)",
      },
    },
  },
  plugins: [],
};

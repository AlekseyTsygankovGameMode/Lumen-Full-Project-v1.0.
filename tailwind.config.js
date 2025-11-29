// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./client/**/*.{html,js,ts,tsx}",
    "./core/**/*.{html,js,ts,tsx}",
    "./api/**/*.{html,js,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lumen: {
          light: "#E0E7FF",
          mid: "#93C5FD",
          deep: "#2563EB"
        }
      },
      boxShadow: {
        'lumen-glow': "0 0 20px rgba(147,197,253,0.6)"
      },
      borderRadius: {
        'lumen': '1.25rem'
      }
    }
  },
  plugins: []
};
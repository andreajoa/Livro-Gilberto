/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B3E',
          mid: '#152347',
          light: '#1E3160',
        },
        cyan: {
          DEFAULT: '#00C4D4',
          light: '#33D4E2',
        },
        gold: '#C9A84C',
        paper: '#F5F0E8',
        'off-white': '#F0F4FF',
        'text-muted': '#8A9BBF',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        editorial: ['"Cormorant Garant"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      backgroundImage: {
        'grain-pattern': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-18px) rotate(-2deg)' },
        },
      },
      boxShadow: {
        'book': '24px 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,196,212,0.15)',
        'glow': '0 0 40px rgba(0,196,212,0.3)',
      },
    },
  },
  plugins: [],
}

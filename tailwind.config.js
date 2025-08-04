/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF10F0',
        'neon-cyan': '#10FFFF',
        'neon-green': '#10FF10',
        'neon-yellow': '#FFFF10',
        'neon-orange': '#FF8010',
        'neon-purple': '#8010FF',
        'neon-blue': '#1080FF',
        'retro-black': '#000000',
        'retro-white': '#FFFFFF',
        'retro-gray': '#C0C0C0',
        'retro-silver': '#E0E0E0'
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'cursive'],
        'pixel': ['Courier New', 'monospace'],
        'serif': ['Times New Roman', 'serif']
      },
      animation: {
        'blink': 'blink 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(45deg, #FF10F0, #10FFFF, #10FF10, #FFFF10, #FF8010)',
        'gradient-90s': 'linear-gradient(135deg, #FF10F0, #8010FF, #10FFFF)',
        'gradient-neon': 'linear-gradient(90deg, #10FF10, #10FFFF, #FF10F0)'
      }
    },
  },
  plugins: [],
}
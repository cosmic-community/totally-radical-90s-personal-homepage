/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff10f0',
          green: '#39ff14',
          blue: '#00bfff',
          yellow: '#ffff00',
          orange: '#ff6600',
          purple: '#bf00ff',
          cyan: '#00ffff',
        },
        retro: {
          bg: '#008080',
          text: '#ffff00',
          border: '#ff00ff',
        }
      },
      fontFamily: {
        pixel: ['Courier New', 'monospace'],
        comic: ['Comic Sans MS', 'cursive'],
        serif: ['Times New Roman', 'serif'],
      },
      animation: {
        blink: 'blink 1s linear infinite',
        rainbow: 'rainbow 3s linear infinite',
        bounce-slow: 'bounce 2s infinite',
        spin-slow: 'spin 3s linear infinite',
        pulse-fast: 'pulse 1s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        },
        rainbow: {
          '0%': { color: '#ff0000' },
          '16%': { color: '#ff8000' },
          '33%': { color: '#ffff00' },
          '50%': { color: '#00ff00' },
          '66%': { color: '#0080ff' },
          '83%': { color: '#8000ff' },
          '100%': { color: '#ff0000' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'gradient-90s': 'linear-gradient(45deg, #ff10f0, #39ff14, #00bfff, #ffff00)',
        'gradient-rainbow': 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
        'starfield': 'radial-gradient(white 1px, transparent 1px)',
      },
      boxShadow: {
        'neon': '0 0 10px currentColor',
      },
    },
  },
  plugins: [],
}
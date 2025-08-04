/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic': ['Comic Sans MS', 'cursive'],
        'serif': ['Times New Roman', 'serif'],
      },
      colors: {
        'neon-pink': '#FF10F0',
        'neon-cyan': '#10FFFF', 
        'neon-green': '#10FF10',
        'neon-yellow': '#FFFF10',
        'neon-orange': '#FF8010',
        'neon-purple': '#8010FF',
        'neon-blue': '#1080FF',
      },
      animation: {
        'marquee': 'marquee 15s linear infinite',
        'marquee-reverse': 'marquee-reverse 15s linear infinite',
        'marquee-slow': 'marquee-slow 25s linear infinite',  
        'marquee-fast': 'marquee-fast 8s linear infinite',
        'blink': 'blink 1s infinite',
        'blink-slow': 'blink-slow 2s infinite',
        'blink-fast': 'blink-fast 0.5s infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'marquee-slow': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-fast': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'blink-slow': {
          '0%, 60%': { opacity: '1' },
          '61%, 100%': { opacity: '0' },
        },
        'blink-fast': {
          '0%, 30%': { opacity: '1' },
          '31%, 100%': { opacity: '0' },
        },
        wiggle: {
          '0%, 7%': { transform: 'rotateZ(0)' },
          '15%': { transform: 'rotateZ(-15deg)' },
          '20%': { transform: 'rotateZ(10deg)' },
          '25%': { transform: 'rotateZ(-10deg)' },
          '30%': { transform: 'rotateZ(6deg)' },
          '35%': { transform: 'rotateZ(-4deg)' },
          '40%, 100%': { transform: 'rotateZ(0)' },
        },
        'bounce-slow': {
          '0%, 20%, 53%, 80%, 100%': {
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -20px, 0)',
          },
          '70%': {
            'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -10px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -2px, 0)',
          },
        },
      },
    },
  },
  plugins: [],
}
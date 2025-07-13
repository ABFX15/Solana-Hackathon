/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float-welcome': 'float-welcome 2s ease-in-out infinite',
        'rainbow': 'rainbow 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spark': 'spark 2s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'typewriter': 'typewriter 4s steps(40) infinite',
        'blink': 'blink 1s step-end infinite',
        'zoom': 'zoom 0.5s ease-in-out',
        'flip': 'flip 1s ease-in-out',
        'rotate-y': 'rotate-y 1s ease-in-out',
        'scale-up': 'scale-up 0.3s ease-out',
        'scale-down': 'scale-down 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
        },
        'float-welcome': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        rainbow: {
          '0%': { color: '#ff0000' },
          '16.66%': { color: '#ff8000' },
          '33.33%': { color: '#ffff00' },
          '50%': { color: '#00ff00' },
          '66.66%': { color: '#0080ff' },
          '83.33%': { color: '#8000ff' },
          '100%': { color: '#ff0000' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 5px #22d3ee' },
          '100%': { 'box-shadow': '0 0 20px #22d3ee, 0 0 30px #22d3ee' },
        },
        spark: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        zoom: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        flip: {
          '0%': { transform: 'perspective(400px) rotateY(0)' },
          '100%': { transform: 'perspective(400px) rotateY(360deg)' },
        },
        'rotate-y': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'scale-up': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'scale-down': {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(34, 211, 238, 0.5)',
        'glow-lg': '0 0 30px rgba(34, 211, 238, 0.6)',
        'glow-xl': '0 0 45px rgba(34, 211, 238, 0.7)',
        'inner-glow': 'inset 0 0 15px rgba(34, 211, 238, 0.3)',
        'cyan-glow': '0 0 20px rgba(34, 211, 238, 0.5)',
        'cyan-lg': '0 0 40px rgba(34, 211, 238, 0.6)',
        'purple-glow': '0 0 20px rgba(168, 85, 247, 0.5)',
        'purple-lg': '0 0 40px rgba(168, 85, 247, 0.6)',
        'blue-glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'blue-lg': '0 0 40px rgba(59, 130, 246, 0.6)',
        'green-glow': '0 0 20px rgba(34, 197, 94, 0.5)',
        'green-lg': '0 0 40px rgba(34, 197, 94, 0.6)',
        'red-glow': '0 0 20px rgba(239, 68, 68, 0.5)',
        'red-lg': '0 0 40px rgba(239, 68, 68, 0.6)',
        'yellow-glow': '0 0 20px rgba(251, 191, 36, 0.5)',
        'yellow-lg': '0 0 40px rgba(251, 191, 36, 0.6)',
        'pink-glow': '0 0 20px rgba(236, 72, 153, 0.5)',
        'pink-lg': '0 0 40px rgba(236, 72, 153, 0.6)',
        'indigo-glow': '0 0 20px rgba(99, 102, 241, 0.5)',
        'indigo-lg': '0 0 40px rgba(99, 102, 241, 0.6)',
        'orange-glow': '0 0 20px rgba(249, 115, 22, 0.5)',
        'orange-lg': '0 0 40px rgba(249, 115, 22, 0.6)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.5)',
        'emerald-lg': '0 0 40px rgba(16, 185, 129, 0.6)',
        'teal-glow': '0 0 20px rgba(20, 184, 166, 0.5)',
        'teal-lg': '0 0 40px rgba(20, 184, 166, 0.6)',
        'lime-glow': '0 0 20px rgba(132, 204, 22, 0.5)',
        'lime-lg': '0 0 40px rgba(132, 204, 22, 0.6)',
        'rose-glow': '0 0 20px rgba(244, 63, 94, 0.5)',
        'rose-lg': '0 0 40px rgba(244, 63, 94, 0.6)',
        'violet-glow': '0 0 20px rgba(139, 92, 246, 0.5)',
        'violet-lg': '0 0 40px rgba(139, 92, 246, 0.6)',
        'fuchsia-glow': '0 0 20px rgba(217, 70, 239, 0.5)',
        'fuchsia-lg': '0 0 40px rgba(217, 70, 239, 0.6)',
        'amber-glow': '0 0 20px rgba(245, 158, 11, 0.5)',
        'amber-lg': '0 0 40px rgba(245, 158, 11, 0.6)',
        'sky-glow': '0 0 20px rgba(14, 165, 233, 0.5)',
        'sky-lg': '0 0 40px rgba(14, 165, 233, 0.6)',
        'stone-glow': '0 0 20px rgba(120, 113, 108, 0.5)',
        'stone-lg': '0 0 40px rgba(120, 113, 108, 0.6)',
        'neutral-glow': '0 0 20px rgba(115, 115, 115, 0.5)',
        'neutral-lg': '0 0 40px rgba(115, 115, 115, 0.6)',
        'zinc-glow': '0 0 20px rgba(113, 113, 122, 0.5)',
        'zinc-lg': '0 0 40px rgba(113, 113, 122, 0.6)',
        'gray-glow': '0 0 20px rgba(107, 114, 128, 0.5)',
        'gray-lg': '0 0 40px rgba(107, 114, 128, 0.6)',
        'slate-glow': '0 0 20px rgba(100, 116, 139, 0.5)',
        'slate-lg': '0 0 40px rgba(100, 116, 139, 0.6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#22d3ee",
          "secondary": "#a78bfa",
          "accent": "#06b6d4",
          "neutral": "#1f2937",
          "base-100": "#0f172a",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f5f2',
          100: '#eee6db',
          200: '#e0ccb5',
          300: '#d2b090',
          400: '#c4946a',
          500: '#b67845', // Primary brand color
          600: '#a35e3b',
          700: '#8a4731',
          800: '#723327',
          900: '#5a221e'
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#d8dfe9',
          300: '#b9c5d8',
          400: '#94a6c4',
          500: '#6d88b0',
          600: '#526c96',
          700: '#425373',
          800: '#324052',
          900: '#273240'
        },
        accent: {
          50: '#fdf6ed',
          100: '#f9e8d0',
          200: '#f5d3a2',
          300: '#efb86b',
          400: '#e89c3e', // Accent color (food-inspired)
          500: '#e07d12',
          600: '#cb620d',
          700: '#a8480e',
          800: '#863a12',
          900: '#6d3113'
        },
        success: {
          50: '#f2f8f0',
          100: '#e2f0df',
          200: '#c5e2bf',
          300: '#9acf93',
          400: '#70b964',
          500: '#4e9d45',
          600: '#3a8135',
          700: '#30682d',
          800: '#295128',
          900: '#234323'
        },
        warning: {
          50: '#fefcee',
          100: '#fcf7d2',
          200: '#faeca5',
          300: '#f7dd6d',
          400: '#f4cb41',
          500: '#f0b312',
          600: '#d9910e',
          700: '#b46c0f',
          800: '#925214',
          900: '#784315'
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Poppins', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
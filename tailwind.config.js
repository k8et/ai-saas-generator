/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}' // адаптируй под свою структуру
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito-sans)', 'sans-serif'],
      },
      animation: {
        'zoom-in-95': 'zoom-in-95 0.2s ease-out',
        'zoom-out-95': 'zoom-out-95 0.2s ease-in',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        primary: {
          DEFAULT: '#0658F9',
          50: '#E0EDFF',
          100: '#B3D2FF',
          200: '#80B3FF',
          300: '#4D94FF',
          400: '#1A75FF',
          500: '#0658F9', // main
          600: '#0447C6',
          700: '#033593',
          800: '#022460',
          900: '#01132D'
        },
        secondary: {
          DEFAULT: '#16161E',
          50: '#e5e5eb',
          100: '#c9c9d3',
          200: '#a3a3b3',
          300: '#7c7c92',
          400: '#565672',
          500: '#3c3c59',
          600: '#2f2f46',
          700: '#21262D',
          800: '#16161E', // main
          900: '#0a0a11'
        },
        surface: {
          DEFAULT: '#101015',
          50: '#e4e4e6',
          100: '#c9c9cc',
          200: '#a5a5ab',
          300: '#7f7f89',
          400: '#5a5a67',
          500: '#323943',
          600: '#2d2d36',
          700: '#1e1e24',
          800: '#101015', // main
          900: '#08080b'
        },
        danger: {
          DEFAULT: '#FF0004',
          50: '#ffe6e6',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff1a1a',
          500: '#FF0004', // main
          600: '#cc0003',
          700: '#990002',
          800: '#660001',
          900: '#330001'
        },
        default: {
          DEFAULT: '#21262D',
          50: '#e6e7e9',
          100: '#cfd1d5',
          200: '#aeb3ba',
          300: '#8d959f',
          400: '#6c7784',
          500: '#4b5969',
          600: '#3a4654',
          700: '#2a343f',
          800: '#21262D', // main
          900: '#111417'
        },
        success: {
          DEFAULT: '#0ECB68'
        }
      }
    }
  },
}

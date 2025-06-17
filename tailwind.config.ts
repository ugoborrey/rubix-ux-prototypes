import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubix': ['var(--font-rubix)', 'sans-serif'],
        'sans': ['var(--font-rubix)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Mako Design System Colors
        blue: {
          10: '#FBFDFE',
          25: '#F6FAFD',
          50: '#EEF6FC',
          100: '#D8ECF8',
          200: '#BADEF3',
          300: '#8ACAEA',
          400: '#56AEE1',
          500: '#2F8DDA', // Primary Blue
          600: '#2671D9',
          700: '#265FD9',
          800: '#204DB6',
          900: '#19448F',
          950: '#051E50',
        },
        yellow: {
          10: '#FFFEF5',
          25: '#FFFEF0',
          50: '#FFFEEA',
          100: '#FFF9C5',
          200: '#FFF285',
          300: '#FFE546',
          400: '#FFD700',
          500: '#FFB400', // Primary Yellow
          600: '#E28A00',
          700: '#BB6002',
          800: '#984A08',
          900: '#7C3D0B',
          950: '#481F00',
        },
        green: {
          10: '#FAFFFC',
          25: '#F5FEFA',
          50: '#EFFEF6',
          100: '#DBFBEC',
          200: '#BAF7DA',
          300: '#84F1BD',
          400: '#3EEA99',
          500: '#17D079', // Secondary Green
          600: '#00C66A',
          700: '#009550',
          800: '#007B43',
          900: '#00673A',
          950: '#00341E',
        },
        red: {
          10: '#FEFBFB',
          25: '#FEF7F6',
          50: '#FDF4F3',
          100: '#FCE6E4',
          200: '#FBD1CD',
          300: '#F7B0AA',
          400: '#F08379',
          500: '#E55A4E', // Secondary Red
          600: '#D23D30',
          700: '#BA3327',
          800: '#922B22',
          900: '#792A23',
          950: '#42110D',
        },
        purple: {
          10: '#FAFBFF',
          25: '#F5F6FF',
          50: '#EEF0FF',
          100: '#E0E3FF',
          200: '#C7CAFE',
          300: '#A5A8FC',
          400: '#8781F8',
          500: '#7463F1', // Secondary Purple
          600: '#6748E5',
          700: '#5838CA',
          800: '#4730A3',
          900: '#3D2E81',
          950: '#251B4B',
        },
        neutral: {
          10: '#FCFDFD',
          25: '#F8FAFB',
          50: '#F1F3F5',
          100: '#EBF1F4',
          200: '#DBE4EA',
          300: '#C4D2DD',
          400: '#ACBCCD',
          500: '#96A7BE',
          600: '#7F8EAC',
          700: '#78849E',
          800: '#59647A',
          900: '#4C5463',
          950: '#2C303A',
        },
        black: '#1A1A1A',
        white: '#FFFFFF',
        
        // Brand shortcuts for easy use
        brand: {
          primary: '#2F8DDA',    // blue-500
          secondary: '#FFB400',  // yellow-500
          accent: '#17D079',     // green-500
          danger: '#E55A4E',     // red-500
          info: '#7463F1',       // purple-500
        }
      },
    },
  },
  plugins: [],
}

export default config 
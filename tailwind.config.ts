import { Config } from 'tailwindcss'
import { tailwindClasses as selectClasses } from '@architecturex/components.select'
import { tailwindClasses as calendarClasses } from '@architecturex/components.calendar'

const config: Config = {
  darkMode: 'class',
  safelist: [...selectClasses, ...calendarClasses],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    maxWidth: {
      large: '1600px',
      xLarge: '1920px'
    },
    extend: {
      colors: {
        caribbean: '#01C98F',
        cerulean: '#007fb2',
        cinnabar: '#E23428',
        codGray: '#111',
        colonial: '#FFEBBD',
        eden: '#135846',
        elephant: '#104235',
        emerald: '#43D440',
        fire: '#F47C06',
        forest: '#2BA829',
        mineShaft: '#333333',
        pacific: '#04B0B6',
        palm: '#0e250a',
        pastel: '#68E365',
        salem: '#038C48',
        seaweed: '#193314',
        spring: '#38FF9C',
        thunderbird: '#C5261B',
        transparent: 'transparent',
        turquoise: '#00C8F9',
        wild: '#00CF68',
        wildSand: '#CCC'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        monserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config

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
        transparent: 'transparent',
        cinnabar: '#E23428',
        caribbean: '#01C98F',
        eden: '#135846',
        elephant: '#104235',
        emerald: '#43D440',
        fire: '#F47C06',
        forest: '#2BA829',
        palm: '#0e250a',
        pastel: '#68E365',
        seaweed: '#193314',
        thunderbird: '#C5261B',
        wild: '#00CF68',
        spring: '#38FF9C',
        salem: '#038C48',
        mineShaft: '#333333',
        wildSand: '#CCC',
        codGray: '#111',
        pacific: '#04B0B6',
        colonial: '#FFEBBD'
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

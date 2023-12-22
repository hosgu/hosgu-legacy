import { Config } from 'tailwindcss'
import { tailwindClasses as buttonClasses } from '@architecturex/components.button'
import { tailwindClasses as inputClasses } from '@architecturex/components.input'
import { tailwindClasses as switcherClasses } from '@architecturex/components.switcher'

const config: Config = {
  darkMode: 'class',
  safelist: [...buttonClasses, ...inputClasses, ...switcherClasses],
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
        orange: '#FA9129',
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
        pacific: '#04B0B6'
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

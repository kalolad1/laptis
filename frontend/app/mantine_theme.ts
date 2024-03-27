import { createTheme, type MantineColorsTuple } from '@mantine/core'

const blue: MantineColorsTuple = [
  '#e8eeff',
  '#ced7ff',
  '#9bacff',
  '#637eff',
  '#3657ff',
  '#183eff',
  '#0232ff',
  '#0024e5',
  '#0020cd',
  '#001ab5'
]

const gray: MantineColorsTuple = [
  '#f2f2ff',
  '#e1e4f0',
  '#c3c7d9',
  '#a1a8c2',
  '#858dae',
  '#737ca3',
  '#6a749e',
  '#59638a',
  '#4f577d',
  '#404b71'
]

const black: MantineColorsTuple = [
  '#f3f5f6',
  '#e7e7e7',
  '#cccccc',
  '#aeb0b3',
  '#93989e',
  '#828991',
  '#79818c',
  '#676f7a',
  '#5a636e',
  '#4b5563'
]

// Font guidelines:
// Use regular weight (400) and gray color for subtext
// Use medium weight (500) for normal text
// Use bold weight (700) for headings
export const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue,
    gray,
    black
  },
  fontFamily: 'Plus Jakarta Sans, sans-serif'
})

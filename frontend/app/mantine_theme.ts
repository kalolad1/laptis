import { createTheme, type MantineColorsTuple } from '@mantine/core'

const gray: MantineColorsTuple = [
  '#fef2f5',
  '#eae6e7',
  '#cdcdcd',
  '#b2b2b2',
  '#9a9a9a',
  '#8b8b8b',
  '#848484',
  '#717171',
  '#676465',
  '#5e5457'
]

const black: MantineColorsTuple = [
  '#f5f5f5',
  '#e7e7e7',
  '#cdcdcd',
  '#b2b2b2',
  '#9a9a9a',
  '#8b8b8b',
  '#848484',
  '#717171',
  '#656565',
  '#575757'
]

export const theme = createTheme({
  colors: {
    gray,
    black
  },
  fontFamily: 'Nunito Sans, sans-serif'
})

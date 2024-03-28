import { theme } from './mantine_theme'

import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'

export const metadata = {
  title: 'Laptis',
  description: 'A platform to find the best drug treatment center for you.'
}

export default function RootLayout ({ children }: { children: any }): JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#f6f6f6' }}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}

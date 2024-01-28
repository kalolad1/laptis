import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from '../theme'

export const metadata = {
  title: 'Laptis',
  description: 'A platform to find the best drug treatment center for you.'
}

export default function RootLayout ({ children }: { children: any }): any {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Totally Radical 90s Homepage!',
  description: 'Welcome to the most AWESOME corner of cyberspace! A totally tubular 90s experience!',
  keywords: ['90s', 'retro', 'homepage', 'radical', 'awesome', 'personal website'],
  authors: [{ name: '90s Kid' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💿</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
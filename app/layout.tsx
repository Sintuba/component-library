import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Component Library Preview',
  description: 'Preview of all UI components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

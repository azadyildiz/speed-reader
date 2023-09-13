import './globals.css'

export const metadata = {
  title: 'Speed Reader',
  description: 'fastest way to read, word by word ⚡',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

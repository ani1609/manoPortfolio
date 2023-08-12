import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>Manorwar</title>
      <body>{children}</body>
    </html>
  )
}

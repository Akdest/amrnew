import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AMR Dashboard',
  description: 'Autonomous Mobile Robot Monitoring Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <body className="bg-[#f4f7fb] text-black min-h-screen">
        {children}
      </body>

    </html>
  )
}
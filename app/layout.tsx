import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/navigation/Footer'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'coffee')}>
        <div className='flex flex-col min-h-screen'>
          <Navigation />
            <main className='flex flex-grow justify-center items-center'>
              {children}
            </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}

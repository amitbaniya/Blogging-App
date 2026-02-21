import StoreProvider from '@/state/ReduxProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import UserLoader from '@/components/auth/user-loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ink & Insights | Blog',
  description: 'A simple blogging app where you can view blogs created by others, react comment on them. And you can create your own blog as well.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <UserLoader>
            {children}
          </UserLoader>
        </StoreProvider></body>
    </html>
  )
}

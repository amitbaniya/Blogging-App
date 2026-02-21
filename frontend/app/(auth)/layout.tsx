'use client'
import '@/app/globals.css'
import { useAppSelector } from '@/state/hooks'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = useAppSelector((state) => state.auth)
    if (user.loading) {
        return (<p>Loading...</p>)
    }

    if (!user.loading && user.isAuthenticated) {
        redirect('/')
    }

    if (!user.loading && !user.isAuthenticated) {
        return (
            <>
                {children}
            </>
        )
    }
}

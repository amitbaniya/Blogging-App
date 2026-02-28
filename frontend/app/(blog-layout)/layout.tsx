import '@/app/globals.css'
import MainHeader from '@/components/header/main-header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


export const metadata: Metadata = {
    title: 'Blog',
    description: 'Browse blogs and read the blogs as well.'
}

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <MainHeader />
            {children}
        </>
    )
}

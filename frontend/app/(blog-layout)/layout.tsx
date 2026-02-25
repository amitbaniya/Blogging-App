import '@/app/globals.css'
import MainHeader from '@/components/header/main-header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


export const metadata: Metadata = {
    title: 'Auth',
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

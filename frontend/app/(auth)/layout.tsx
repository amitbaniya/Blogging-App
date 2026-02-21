'use client'
import '@/app/globals.css'
import { useAppSelector } from '@/state/hooks'
import { redirect } from 'next/navigation'



export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = useAppSelector((state) => state.auth)
    if (user.loading && !user.error) {
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

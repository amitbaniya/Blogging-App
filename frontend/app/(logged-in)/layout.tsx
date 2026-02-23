'use client'
import MainHeader from '@/components/header/main-header'
import { useAppSelector } from '@/state/hooks'
import { redirect } from 'next/navigation'
import { showToast } from "nextjs-toast-notify";

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode
}) {

    let content = <></>
    const user = useAppSelector((state) => state.auth)
    if (user.loading && !user.error) {
        content = <p>Loading...</p>
    }

    if (!user.loading && !user.isAuthenticated) {
        if (user.error) {
            showToast.error("Authentication error!", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            });
        }
        redirect('/auth')
    }

    if (!user.loading && user.isAuthenticated) {
        content = <>{children}</>
    }

    return (
        <div className='flex flex-col h-screen'>
            <MainHeader />
            {content}
        </div>
    )
}

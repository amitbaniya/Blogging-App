'use client'

import { useAppSelector } from "@/state/hooks"

import Link from "next/link"
import { EditOutlined } from '@ant-design/icons';
import ProfileMenu from "./profile-menu"
import { usePathname } from "next/navigation";
import { createBlog } from "@/lib/blog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMounted } from "@/lib/hooks";

export function AuthHeader() {
    const mounted = useMounted()
    const pathname = usePathname();
    const auth = useAppSelector((state) => state.auth)
    let shareBlogPage: boolean = pathname.includes('share-blog/')

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    async function handleShareBlog() {
        try {
            setIsLoading(true)
            const blogId = await createBlog();
            router.push(`/share-blog/${blogId}`)
        } catch (error) {
            console.log(error)
        } finally { setIsLoading(true) }

    }

    if (!mounted) {
        return null
    }
    return (
        <div className="flex gap-3 items-center pr-4 text-white">
            {!shareBlogPage && <button onClick={handleShareBlog}
                className="bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-2">
                {!isLoading ? <EditOutlined /> : <span className='loader'></span>}Create Blog</button>}


            {auth.isAuthenticated && !auth.loading ?
                <>
                    <ProfileMenu />
                </>
                :
                <Link
                    className="border
                    border-orange-600 
                        text-orange-600 p-2 px-3 rounded-xl font-bold  cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out"
                    href={'/auth'}>Login</Link>
            }

        </div>
    )


}
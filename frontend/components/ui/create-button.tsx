'use client'

import { createBlog } from "@/lib/blog";
import { useAppSelector } from "@/state/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditOutlined } from '@ant-design/icons';

export default function CreateNewBlogButton({ colorStyle, children }: { colorStyle: string, children: React.ReactNode }) {

    const user = useAppSelector((state) => state.auth)

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);


    async function handleShareBlog() {
        try {
            setIsLoading(true)
            if (user.isAuthenticated) {
                const blogId = await createBlog();
                router.push(`/share-blog/${blogId}`)
                return
            }

            router.push('/auth')
        } catch (error) {
            console.log(error)
        } finally { setIsLoading(true) }

    }
    return (
        <>
            <button onClick={handleShareBlog}
                className={`${colorStyle}
                        text-white p-2 px-3 rounded-xl font-bold opacity-80  cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-2`}>
                {!isLoading ? <EditOutlined /> : <span className='loader'></span>}{children}</button>
        </>

    )
}
'use client'

import { useAppSelector } from "@/state/hooks"

import Link from "next/link"
import ProfileMenu from "./profile-menu"
import { usePathname } from "next/navigation";

import { useMounted } from "@/lib/hooks";
import CreateNewBlogButton from "../ui/create-button";

export function AuthHeader() {
    const mounted = useMounted()
    const pathname = usePathname();
    const user = useAppSelector((state) => state.auth)
    let shareBlogPage: boolean = pathname.includes('share-blog/')


    if (!mounted) {
        return null
    }
    return (
        <div className="flex gap-3 items-center pr-4 text-white">
            {!shareBlogPage &&
                <CreateNewBlogButton colorStyle="bg-linear-to-r from-orange-600 to-orange-300 shadow-lg shardow-orange-500/50">
                    Create Blog
                </CreateNewBlogButton>}


            {user.isAuthenticated && !user.loading ?
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
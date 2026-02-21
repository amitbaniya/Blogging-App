'use client'

import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { logoutAsync } from "@/state/user/authSlice"
import { Avatar } from "antd"
import Link from "next/link"
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react"

export function AuthProfile() {

    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const [menuOpen, setMenuOpen] = useState(false)

    async function handleLogout() {
        dispatch(logoutAsync())
    }

    return (
        <div className="flex gap-3 items-center pr-4 text-white">
            <Link href={'/share-blog'}
                className="bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-2">
                <EditOutlined />Create Blog</Link>

            {auth.isAuthenticated && !auth.loading ?
                <>


                    <div className="relative cursor-pointer">
                        <Avatar size={40} icon={<UserOutlined />} onClick={() => setMenuOpen(prev => !prev)} />
                        {menuOpen &&
                            <div className="absolute top-[110%] 
                            right-0 border bg-[#FFFBEB]
                            p-3 w-25 border-orange-600 rounded-xl
                            text-orange-600 font-semibold text-sm flex flex-col gap-2">
                                <Link href={'/profile'} className="
                                cursor-pointer 
                                hover:scale-102 transition-all
                                duration-500 ease-in-out">Profile</Link>
                                <button
                                    className="
                                cursor-pointer 
                                hover:scale-102 transition-all
                                duration-500 ease-in-out text-left"
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        }
                    </div>
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
'use client'
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { logoutAsync } from "@/state/user/authSlice";
import Link from "next/link";

export default function ProfileMenu() {
    const [menuOpen, setMenuOpen] = useState(false)
    const user = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    async function handleLogout() {
        dispatch(logoutAsync())
    }


    return (
        <div className="relative cursor-pointer ">
            <Avatar size={40} icon={<UserOutlined />} src={user.imageUrl} onClick={() => setMenuOpen(prev => !prev)} />
            {menuOpen &&
                <div className="absolute top-[110%] 
                            right-0 border bg-[#FFFBEB]
                            p-3 w-25 border-orange-600 rounded-xl
                            text-orange-600 font-semibold text-sm flex flex-col gap-2 z-1000">
                    <Link href={'/profile'} className="
                                cursor-pointer 
                                hover:scale-102 transition-all
                                duration-500 ease-in-out">Profile</Link>
                    <Link href={'/publisher-blogs'} className="
                                cursor-pointer 
                                hover:scale-102 transition-all
                                duration-500 ease-in-out">Your Blogs</Link>

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
    )
}
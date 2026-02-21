'use client'

import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { logoutAsync } from "@/state/user/authSlice"
import Link from "next/link"

export function AuthProfile() {

    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    async function handleLogout() {
        dispatch(logoutAsync())
    }

    return (
        <div className="flex gap-1 items-center pr-4">
            <div>
                <span>{auth.name}</span>
            </div>
            {auth.isAuthenticated && !auth.loading ?
                <button className="cursor-pointer rounded-md bg-amber-800 p-2" onClick={handleLogout}>
                    Logout
                </button>
                :
                <Link href={'/auth'}>Login</Link>
            }
        </div>
    )


}
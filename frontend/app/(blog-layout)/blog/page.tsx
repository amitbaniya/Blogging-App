'use client'

import { useAppSelector } from "@/state/hooks"

export default function BlogPage() {
    const user = useAppSelector((state) => state.auth)

    if (user.loading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
            <h1>Blog Page
            </h1>
            <span>{user.name}</span>
        </>
    )
}
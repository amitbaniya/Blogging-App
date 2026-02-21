'use client'

import { useAppDispatch } from "@/state/hooks"
import { userAsync } from "@/state/user/authSlice";
import { ReactNode, useEffect } from "react";


export default function UserLoader({
    children,
}: {
    children: ReactNode
}) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userAsync())
    }, []);

    return (
        <>
            {children}
        </>
    )
}
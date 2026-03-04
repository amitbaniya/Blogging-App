'use client'

import { useState, useEffect } from 'react'

type Props = {
    emailAvailable: boolean
    onResend: () => Promise<void>
}

export default function ResendButton({ emailAvailable, onResend }: Props) {
    const [cooldown, setCooldown] = useState(0)
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        if (cooldown <= 0) return

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [cooldown])

    async function handleClick() {
        if (cooldown > 0) return

        setIsSending(true)

        await onResend()

        setIsSending(false)
        setCooldown(60)
    }

    return (
        <div className='flex justify-center gap-3'>
            <p>Didn't recieve an email?</p>
            <button
                type="button"
                onClick={handleClick}
                disabled={cooldown > 0 || isSending}
                className=' text-orange-600 font-bold hover:underline'
            >
                {isSending && <span className='loader'></span>}
                {cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : 'Resend Email'}
            </button>
        </div>
    )
}
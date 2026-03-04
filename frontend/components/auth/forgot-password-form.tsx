'use client'

import { Input } from "antd"
import Link from "next/link"
import { useState } from "react"
import ResendButton from "./ResendButton"
import { GoogleOutlined } from '@ant-design/icons';


export default function ForgotPasswordForm({ onSubmit }: { onSubmit: (email: string) => Promise<void> }) {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault()

        if (!email) {
            setError("Email cannot be empty!")
            return
        }
        setLoading(true)

        await onSubmit(email)

        setLoading(false)
        setSent(true)
    }
    if (sent) {
        return (
            <section className="flex flex-col gap-5 w-xl">
                <header className='py-10'>
                    <h1 className='font-bold text-4xl pb-3'>Check your email</h1>
                    <span className='opacity-60 '>We have sent a password recovery link to your email address. Please follow the instructions to reset your password.</span>
                </header>

                <div className="flex gap-3 flex-col">
                    <a
                        href="https://mail.google.com"
                        target="_blank"
                        className="w-full bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-4 rounded-2xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-3 justify-center items-center disabled:opacity-50"
                    >
                        <GoogleOutlined />
                        Open Gmail
                    </a>

                </div>

                <ResendButton emailAvailable={!email} onResend={() => onSubmit(email)} />
                <div className=' gap-1 flex flex-row justify-center my-10 font-medium opacity-65'>

                    <Link
                        href={'/auth'}
                        className='text-orange-600 font-semibold cursor-pointer hover:underline
                            hover:scale-105 transition-all
                            duration-300 ease-in-out'
                    >

                        Back to Login
                    </Link>
                </div>
            </section>
        )
    }

    return (

        <section className='flex flex-col gap-5 w-xl'>
            <header className='py-10'>
                <h1 className='font-bold text-4xl pb-3'>Forgot your Password?</h1>
                <span className='opacity-60 '>Enter your email address and we will send you a link to reset your password.</span>
            </header>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 justify-start'>

                <div className='flex flex-col gap-1'>
                    <label className='text-[14px] font-bold opacity-80' htmlFor='email'>Email address</label>
                    <Input type='email' id="email" name="email" placeholder='name@gmail.com'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }} />
                    {error &&
                        <p className="text-red-500 text-sm pl-2">{error}</p>
                    }
                </div>
                <div className='flex flex-col'>
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-4 rounded-2xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-3 justify-center items-center'
                    >
                        {loading && <span className='loader'></span>}
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                    <div className=' gap-1 flex flex-row justify-center my-10 font-medium opacity-65'>

                        <Link
                            href={'/auth'}
                            className='text-orange-600 font-semibold cursor-pointer hover:underline
                            hover:scale-105 transition-all
                            duration-300 ease-in-out'
                        >

                            Back to Login
                        </Link>
                    </div>
                </div>
            </form>
        </section >
    )
}
'use client'
import { resetPassword } from "@/lib/auth";
import { RouteParams } from "@/types";
import { Input } from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useState } from "react";

export default function ResetForm() {
    const params = useParams<{ resetToken: string }>()
    const resetToken: string = params.resetToken;

    const [error, setError] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const router = useRouter();


    function validate(): boolean {
        setError(null);

        if (!newPassword) {
            setError("New password cannot be empty!");
            return false;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }

        if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            setError("Password must contain letters and numbers.");
            return false;
        }

        if (!confirmPassword) {
            setError("Confirm password cannot be empty!");
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return false;
        }

        return true;
    }
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault()

        if (!validate()) return;

        setLoading(true)

        try {
            await resetPassword(resetToken, newPassword)
            showToast.success("Password reset Successfully!", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false

            });
            router.replace('/auth')
        } catch (error) {
            console.log(error)
            showToast.error("Something  went wrong!", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            });
        } finally {
            setLoading(false)
        }
    }




    return (
        <section className="flex flex-col gap-5 w-xl">
            <header className='py-10'>
                <h1 className='font-bold text-4xl pb-3'>Reset your password</h1>
                <span className='opacity-60 '>Please create a strong new password to secure your account.</span>
            </header>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 justify-start'>
                <div className='flex flex-col gap-1'>
                    <label className='text-[14px] font-bold opacity-80' htmlFor='email'>New Password</label>
                    <Input.Password type='newPassword' id="newPassword" name="newPassword" placeholder='************'
                        style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }}
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <span className='text-[10px] opacity-65'>Must be at least 8 characters long with a mix of letter and numbers.</span>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-[14px] font-bold opacity-80' htmlFor='email'>Confirm Password</label>

                    <Input.Password type='password' id="confirmPassword" name="confirmPassword"
                        placeholder='************'
                        style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }}
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                {error &&
                    <p className="text-red-500 text-sm pl-2">{error}</p>
                }
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
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
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
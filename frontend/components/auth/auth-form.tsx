

'use client'
import { registerSubmit } from '@/lib/auth';
import { Checkbox, Input } from 'antd';
import { useState } from 'react';
import { authFormTypes } from '@/types';
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { loginAsync } from '@/state/user/authSlice';
import Link from 'next/link';
import classes from './auth.module.css'
import { showToast } from 'nextjs-toast-notify';


export default function AuthForm() {
    const user = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        if (isLogin) {
            const data: authFormTypes = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            }
            try {
                setIsLoading(true)
                await dispatch(loginAsync(data))
            } catch (error: any) {
                const err: string = error ?? "Something went wrong"
                showToast.error(err, {
                    duration: 4000,
                    position: "top-center",
                    transition: "bounceIn",
                    progress: false
                });
                console.log(error)
            } finally {
                setIsLoading(false)
            }

        }
        else {
            const data: authFormTypes = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            }
            try {
                setIsLoading(true)
                const response = await registerSubmit(data)
                console.log(response.message)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
                setIsLogin(true)
            }
        }
    }

    return (
        <section className='flex flex-col gap-5 w-xl'>
            <header className='py-10'>
                <h1 className='font-bold text-4xl pb-3'>{isLogin ? 'Welcome Back' : 'Create your Account'}</h1>
                <div></div>
                <span className='opacity-60 '>{isLogin ? 'Sign in to start your next great story.' : 'Join the conversation and start writing.'}</span>
            </header>
            <form onSubmit={submitHandler} className='flex flex-col gap-5 justify-start'>
                {!isLogin &&
                    <div className='flex flex-col gap-1'>
                        <label className='text-[14px] font-bold opacity-80' htmlFor='name'>Full Name</label>
                        <Input type='text' id="name" name="name" placeholder='John Doe'
                            style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }} />
                    </div>
                }
                <div className='flex flex-col gap-1'>
                    <label className='text-[14px] font-bold opacity-80' htmlFor='email'>Email address</label>
                    <Input type='email' id="email" name="email" placeholder='name@gmail.com'
                        style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }} />
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-row justify-between'>
                        <label className='text-[14px] font-bold opacity-80' htmlFor='password'>Password</label>
                        {isLogin &&
                            <Link href={'/auth/forgot-password'} className='text-xs font-bold text-orange-600  
                            hover:scale-102 transition-all
                            duration-500 ease-in-out cursor-pointer'>
                                Forgot password?</Link>
                        }
                    </div>
                    <Input.Password type='password' id="password" name="password"
                        placeholder='************'
                        style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }} />
                    {!isLogin &&
                        <span className='text-[10px] opacity-65'>Must be at least 8 characters long with a mix of letter and numbers.</span>
                    }
                </div>
                <div className=''>

                    <Checkbox style={{ fontSize: '12px', fontWeight: 500, opacity: '70%' }} >
                        {!isLogin ?
                            <span className='flex gap-1'>
                                I agree to the
                                <Link href={'/'} className='text-orange-600! '>Terms of Service</Link>
                                and
                                <Link href={'/'} className='text-orange-600!'>Privacy Policy</Link>.
                            </span>
                            :
                            <span className=''>
                                Keep me signed in
                            </span>}

                    </Checkbox>
                </div>
                <div className='flex flex-col'>
                    <button
                        className='w-full bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-4 rounded-2xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-3 justify-center items-center'>
                        {user.loading || isLoading && <span className={classes.loader}></span>}
                        {isLogin ? 'Login' : 'Create Account'}</button>

                    <div className=' gap-1 flex flex-row justify-center my-10 font-medium opacity-65'>
                        <span className=''>
                            {isLogin ? 'New to our platform?' : 'Already have an account?'}
                        </span>
                        <button
                            type='button'
                            className='text-orange-600 font-semibold cursor-pointer 
                            hover:scale-105 transition-all
                            duration-300 ease-in-out'
                            onClick={switchAuthModeHandler}
                        >

                            {isLogin ?

                                'Create your account' :
                                'Sign in'}
                        </button>
                    </div>

                </div>
                <div className='flex justify-center gap-5 font-bold text-xs opacity-30'>
                    <Link href={'/'}>PRIVACY</Link>
                    <Link href={'/'}>TERMS</Link>
                    <Link href={'/'}>CONTACT</Link>
                </div>
            </form>
        </section >
    )

}
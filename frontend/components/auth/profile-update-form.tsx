'use client'

import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { updateAsync } from "@/state/user/authSlice";
import { userDataTypes } from "@/types";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { showToast } from "nextjs-toast-notify";
import { useState } from "react";

export default function ProfileUpdateForm() {

    const user = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    const [isloading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState<userDataTypes>(
        {
            name: user.name,
            email: user.email,
            bio: user.bio,
            linkedin: user.linkedin
        }
    )

    async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data: userDataTypes = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            bio: formData.get('bio') as string,
            linkedin: formData.get('linkeding') as string
        }
        try {
            setIsLoading(true)
            await dispatch(updateAsync(data))
            showToast.success("Updated succesfully", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            });
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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setUserData(prev => ({ ...prev, [name]: value }))

    }
    return (
        <form className=' flex flex-col gap-10' onSubmit={submitHandler}>
            <div className='flex flex-col gap-5'>
                <div className='flex flex-row gap-5'>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='text-[14px] font-bold opacity-80' htmlFor='name'>Full Name</label>
                        <Input type='text' id="name" name="name" placeholder='John Doe' value={userData.name} onChange={handleChange}
                            style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }} />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='text-[14px] font-bold opacity-80' htmlFor='email'>Email address</label>
                        <Input type='email' id="email" name="email" placeholder='name@gmail.com' value={userData.email} onChange={handleChange}
                            style={{ backgroundColor: '#F8FAFC', height: '40px', borderRadius: '15px' }} />
                    </div>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label className='text-[14px] font-bold opacity-80' htmlFor='bio'>Bio</label>
                    <TextArea
                        autoSize={{ minRows: 3, maxRows: 10 }}
                        placeholder="Enter your bio"
                        name='bio'
                        value={userData.bio}
                        onChange={handleChange}
                    />
                </div>

            </div>
            <div>
                <div className='flex'>
                    <span className='flex justify-center items-center border px-5 py-3 rounded-l-lg border-gray-400/30 bg-[#F8FAFC] text-gray-500' >linkedin.com/in/</span>
                    <Input style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} name='linkedin' value={userData.linkedin}
                        onChange={handleChange} />
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='bg-linear-to-r from-orange-600 to-orange-300
                            text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                            shadow-orange-500/50 cursor-pointer 
                            hover:scale-102 transition-all
                            duration-500 ease-in-out'>{isloading && <span className='loader' />}Save</button>
            </div>
        </form>
    )
}
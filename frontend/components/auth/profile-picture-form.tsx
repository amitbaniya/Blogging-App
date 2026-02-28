'use client'

import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from "@/state/hooks";
import { useRef, useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { saveProfilePicture } from "@/lib/auth";
import Image from 'next/image';

export default function ProfilePictureForm() {
    const user = useAppSelector((state) => state.auth)
    const [previewImage, setPreviewImage] = useState(user.imageUrl)
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isUploading, setIsUploading] = useState(false)

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            console.log("File not selected.");
            return;
        }
        const blobUrl = URL.createObjectURL(file)
        setPreviewImage(blobUrl)

        try {
            setIsUploading(true)

            const data = await saveProfilePicture(file);
            console.log("Upload Success:");
            setIsUploading(false)
        } catch (err) {
            console.error("Upload error:", err);
        }
    }


    return (
        <div className='w-full flex gap-5 bg-white p-5 rounded-2xl border-gray-200 border'>
            <input type='file' name="blogImage" onChange={handleImageChange} ref={fileInputRef} accept="image/*" hidden />

            {previewImage && previewImage !== undefined ?
                <div className=" group w-25 h-25 relative rounded-full hover:scale-103 duration-300 ease-in-out overflow-hidden ">
                    <Image src={previewImage} alt='Profile Image' fill className="object-cover" />
                    {isUploading &&
                        <div className="flex bg-gray-900/40 absolute 
                    w-full h-full border border-dashed rounded-2xl
                    flex-col justify-center items-center cursor-pointer
                    text-white">
                            <span className="loader" />
                            Uploading
                        </div>}
                </div>
                :
                <Avatar size={100} icon={<UserOutlined />} />
            }

            <div className='flex flex-col justify-between max-w-80'>
                <h2 className='text-s font-bold'>Profile Photo</h2>
                <p className='text-xs opacity-70'>Accepted formats: JPG, PNG. Max size 2MB. A square image works best.</p>
                <div className='flex gap-3 '>
                    <button type="button" className='bg-linear-to-r from-orange-600 to-orange-300
                            text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                            shadow-orange-500/50 cursor-pointer 
                            hover:scale-102 transition-all
                            duration-500 ease-in-out'
                        onClick={() => fileInputRef.current?.click()}>
                        {previewImage ? <>Change Profile Picture</> : <>Upload New Picture</>}
                    </button>
                    <button className='bg-[#F6F8F8] p-2 px-3 rounded-xl font-bold  cursor-pointer 
                                hover:scale-102 transition-all
                                duration-500 ease-in-out' onClick={() => setPreviewImage('')}>
                        Remove
                    </button>
                </div>
            </div>
        </div >
    )
}
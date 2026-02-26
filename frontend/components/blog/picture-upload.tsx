'use client'

import { SetStateAction, useRef, useState, Dispatch } from "react";
import { PlusOutlined, RetweetOutlined } from '@ant-design/icons';
import Image from "next/image";
import { blogDataTypes, RouteParams } from "@/types";
import { savePicture } from "@/lib/blog";
import { useParams } from "next/navigation";


type UploaderProps = {
    image: string;
    setBlogData: Dispatch<SetStateAction<blogDataTypes>>
};
export default function PictureUpload({ image, setBlogData }: UploaderProps) {
    const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_CLOUDINARY_IMAGE;
    const params = useParams<RouteParams>()
    const blogId: string = params.blogId;

    const [previewImage, setPreviewImage] = useState(image)
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
            const data = await savePicture(blogId, file);
            console.log("Upload Success:", data);
            setBlogData(prev => ({ ...prev, updatedAt: data.updatedAt }))
            setIsUploading(false)
        } catch (err) {
            console.error("Upload error:", err);
        }


    }

    return (

        <section className='flex flex-row gap-5'>
            <input type='file' name="blogImage" onChange={handleImageChange} ref={fileInputRef} accept="image/*" hidden />
            {previewImage ?
                <div className=" group w-40 h-40 relative overflow-hidden rounded-2xl hover:scale-103 duration-300 ease-in-out">
                    <Image src={previewImage}
                        alt='Blog Image' fill
                        className="object-cover hover:scale-103 transition-all ease-in-out duration-300" />
                    {isUploading &&
                        <button type='button' className="flex bg-gray-900/40 absolute 
                    w-full h-full border border-dashed rounded-2xl
                    flex-col justify-center items-center cursor-pointer
                    text-white"
                            onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                            <span className="loader" />
                            Uploading
                        </button>}
                    <button type='button' className="hidden group-hover:flex bg-gray-900/20 absolute 
                    w-full h-full border border-dashed rounded-2xl
                    flex-col justify-center items-center cursor-pointer
                    text-white"
                        onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                        <RetweetOutlined />
                        Change
                    </button>
                </div>
                :
                <div className="w-40 h-40 relative overflow-hidden hover:scale-103 duration-300 ease-in-out">
                    <button type='button' className="w-full h-full
                        border border-dashed rounded-2xl flex flex-col justify-center items-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                        <PlusOutlined />
                        Upload
                    </button>
                </div>
            }


        </section>
    )
}


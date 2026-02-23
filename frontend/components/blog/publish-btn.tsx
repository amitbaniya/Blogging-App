
'use client'
import { publishBlog } from '@/lib/blog';
import { blogDataTypes, RouteParams } from '@/types';
import { EditOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';
import { Dispatch, SetStateAction, useState } from 'react';


export default function PublishButton(
    { status = false,
        setBlogData
    }:
        {
            status: boolean,
            setBlogData: Dispatch<SetStateAction<blogDataTypes>>
        }) {

    const params = useParams<RouteParams>()
    const blogId: string = params.blogId;
    const [publishing, setPublishing] = useState(false)
    async function handlePublish() {
        try {
            setPublishing(true)
            console.log(blogId)
            new Promise(resolve => setTimeout(resolve, 5000))
            const response = await publishBlog(blogId)
            console.log(response)
            const noti = status ? "Made private" : "Published"
            setBlogData(prev => ({ ...prev, published: !status }))

            showToast.success(`${noti}!`, {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            });
        }
        catch (error) {
            console.log(error)
            showToast.error("Error publishing!", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            });

        }
        finally {
            setPublishing(false)
        }
    }
    return (
        <>

            <button onClick={handlePublish}
                className="bg-linear-to-r from-orange-600 to-orange-300
            text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
            shadow-orange-500/50 cursor-pointer 
            hover:scale-102 transition-all
            duration-500 ease-in-out flex gap-2" disabled={publishing}>
                {publishing ? <span className='loading' /> : <EditOutlined />} {!status ? <>Publish Blog</> : <>Make private</>}
            </button>

        </>)
}
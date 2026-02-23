'use client'

import classes from "./blog-form.module.css"
import { blogDataTypes, RouteParams } from "@/types";
import { useEffect, useState } from "react";
import { saveBlog } from "@/lib/blog";
import { useParams } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import { CloudFilled, CloudSyncOutlined } from '@ant-design/icons';
import { showToast } from "nextjs-toast-notify";
import PublishButton from "./publish-btn";


export default function BlogForm({ blog }: { blog: blogDataTypes }) {
    const params = useParams<RouteParams>()
    const blogId: string = params.blogId;

    const [blogData, setBlogData] = useState<blogDataTypes>(blog)
    const [saveLoading, setSaveLoading] = useState(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setBlogData(prev => ({ ...prev, [name]: value }))

    }

    useEffect(() => {

        async function saveData() {
            try {
                setSaveLoading(true)
                const updatedAt = await saveBlog(blogId, blogData)
                setBlogData(prev => ({ ...prev, updatedAt: updatedAt }))
            } catch (error) {
                console.log(error)
                showToast.error("Sync error!", {
                    duration: 4000,
                    position: "top-center",
                    transition: "bounceIn",
                    progress: false
                });

            } finally {
                setSaveLoading(false)
            }
        }
        const timer = setTimeout(() => {
            if (blogData.content || blogData.title) {
                saveData()
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [blogData.content, blogData.title]);


    function getConvertedDate(rawDate: string) {
        const date = new Date(rawDate).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        return date
    }
    return (
        <form className=' flex flex-col gap-5 w-full max-w-250 '>
            <div className="flex flex-row items-center justify-between flex-wrap">
                <div className="flex flex-col opacity-50">
                    <p className="text-sm"><span className="text-base font-bold">Created on:</span> {getConvertedDate(blogData.createdAt)}</p>
                    <p className="text-sm"><span className="text-base font-bold">Updated at:</span> {getConvertedDate(blogData.updatedAt)} </p>
                </div>
                <div className="flex items-center gap-5">
                    <div className="opacity-50 flex items-center gap-3">
                        {!saveLoading ?
                            <>
                                <CloudFilled /> Saved
                            </> :
                            <>
                                <CloudSyncOutlined /> Saving <span className="loader" />
                            </>}
                    </div>
                    {blogData.published && <>
                        <span className="opacity-50">|</span>
                        <span className="opacity-50">
                            Published
                        </span>
                    </>
                    }
                    <PublishButton status={blogData.published} setBlogData={setBlogData} />
                </div>
            </div>
            <TextArea
                autoSize={{ minRows: 1, maxRows: 5 }}
                className={classes.input_field}
                placeholder="Enter your blog title"
                name='title'
                value={blogData.title}
                onChange={handleChange}
            />

            <div className='flex: 1'>
                <TextArea
                    className={classes.content_field}
                    autoSize={{ minRows: 20, maxRows: 40 }}
                    placeholder='Write your story here...'
                    name='content'
                    value={blogData.content} onChange={handleChange} />
            </div>
            <span>ℹ️ TIP: USE MARKDOWN FOR FASTER FORMATTING</span>
        </form>
    )
}
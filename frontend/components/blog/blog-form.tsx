'use client'

import classes from "./blog-form.module.css"
import { blogDataTypes, RouteParams } from "@/types";
import { useEffect, useRef, useState } from "react";
import { getPublisherBlog, saveBlog } from "@/lib/blog";
import { notFound, useParams } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import { CloudFilled, CloudSyncOutlined } from '@ant-design/icons';
import { showToast } from "nextjs-toast-notify";
import PublishButton from "./publish-btn";
import ContentEditor from "./blog-content-editor";
import CustomLoading from "../loading/loading";
import { useRouter } from "next/navigation";
import { getConvertedDate, getSavedAgo } from "@/utils";
import PictureUpload from "./picture-upload";


export default function BlogForm() {
    const router = useRouter()
    const params = useParams<RouteParams>()
    const blogId: string = params.blogId;
    const [blogDataLoading, setBlogDataLoading] = useState(true)
    const isFirstRun = useRef(true);
    const [canSave, setCanSave] = useState(false)

    const [blogData, setBlogData] = useState<blogDataTypes>(
        {
            title: "",
            content: "",
            imageUrl: "",
            published: false,
            createdAt: "",
            updatedAt: "",
            author: {
                _id: "",
                name: "",
            }
        }
    )
    const [saveLoading, setSaveLoading] = useState(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>) {

        const { name, value } = event.target;
        setBlogData(prev => ({ ...prev, [name]: value }))

    }

    useEffect(() => {
        async function fetchBlogData() {
            try {
                setBlogDataLoading(true)
                const blog = await getPublisherBlog(blogId)
                setBlogData(blog)
                setBlogDataLoading(false)
                setTimeout(() => {
                    setCanSave(true)
                }, 3000);
            } catch (error) {
                console.log("Hello", error)
                router.replace('/')
            } finally {

            }

        }
        fetchBlogData();
    }, []);

    async function saveData() {
        try {

            setSaveLoading(true);
            const updatedAt = await saveBlog(blogId, blogData);
            setBlogData(prev => ({ ...prev, updatedAt }));
        } catch (error) {
            console.log(error);
            showToast.error("Sync error!", { duration: 4000, position: "top-center" });
        } finally {
            setSaveLoading(false);
        }
    }

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (!canSave) {
            return
        }

        const timer = setTimeout(() => {
            if (blogData.content || blogData.title) {
                saveData();
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [blogData.content, blogData.title]);


    if (blogDataLoading) {
        return (<CustomLoading />)
    }


    return (
        <form className=' flex flex-col gap-5 w-full max-w-300 h-full p-5'>
            <div className="flex flex-row items-center justify-between flex-wrap">
                <div className="flex flex-col opacity-50">
                    <p className="text-sm"><span className="text-base font-bold">Created on:</span> {getConvertedDate(blogData.createdAt)}</p>
                    <p className="text-sm"><span className="text-base font-bold">Updated at:</span> {getConvertedDate(blogData.updatedAt)} </p>
                </div>
                <div className="flex items-center gap-5">
                    <div className="opacity-50 flex items-center gap-3">
                        <p className="text-sm"> {getSavedAgo(blogData.updatedAt)} </p>
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


            <div className='flex-1'>
                <ContentEditor content={blogData.content} setBlogData={setBlogData} />
            </div>
            <PictureUpload image={blogData.imageUrl} setBlogData={setBlogData} />

        </form>
    )
}


'use client'

import classes from "./blog-form.module.css"
import { blogDataTypes, RouteParams } from "@/types";
import { useEffect, useRef, useState } from "react";
import { deleteBlog, getAIReply, getPublisherBlog, saveBlog } from "@/lib/blog";
import { useParams } from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import { CloudFilled, CloudSyncOutlined, DeleteOutlined } from '@ant-design/icons';
import { showToast } from "nextjs-toast-notify";
import PublishButton from "./publish-btn";
import ContentEditor from "./blog-content-editor";
import CustomLoading from "../loading/loading";
import { useRouter } from "next/navigation";
import { getConvertedDate, getAgo } from "@/utils";
import PictureUpload from "./picture-upload";
import ConfirmationModal from "../ui/confirmation-modal";


export default function BlogForm() {
    const router = useRouter()
    const params = useParams<RouteParams>()
    const blogId: string = params.blogId;
    const [blogDataLoading, setBlogDataLoading] = useState(true)
    const isFirstRun = useRef(true);
    const [canSave, setCanSave] = useState(false)

    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [aiContentLoading, setAiContentLoading] = useState(false)


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
                imageUrl: ""
            },
            publishedOn: ""
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
    }, [blogId]);

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



    const handleDelete = async () => {
        try {
            setDeleteLoading(true)
            await deleteBlog(blogId)

        }
        catch (error) {
            console.log(error)

        } finally {
            setDeleteLoading(false)
            setShowConfirmationModal(false)
            router.replace('/publisher-blogs')
        }
    }


    const handleAIGeneration = async () => {
        try {

            if (!blogData.title) {
                showToast.error("Title is required for content generation!", { duration: 4000, position: "top-center" });
                return
            }
            setAiContentLoading(true)
            const reply = await getAIReply(blogData.title)
            setBlogData(prev => ({ ...prev, content: reply }))
        }
        catch (error) {
            console.log(error)
            showToast.error("Internal Server Error!", { duration: 4000, position: "top-center" });
        } finally {
            setAiContentLoading(false)
        }
    }

    return (
        <>
            {showConfirmationModal && <ConfirmationModal title="Delete this blog?"
                message="Are you sure? This action cannnot be undone and your work will be permanently removed."
                handleSubmit={handleDelete}
                setShowModal={setShowConfirmationModal}
                buttonText="Delete Permanently"
                loading={deleteLoading}
            />
            }
            <form className=' flex flex-col gap-5 w-full max-w-300 lg:h-full p-5'>
                <div className="flex flex-row items-center justify-between flex-wrap">
                    <div className="flex flex-col opacity-50">
                        <p className="text-sm"><span className="text-base font-bold">Created on:</span> {getConvertedDate(blogData.createdAt)}</p>
                        <p className="text-sm"><span className="text-base font-bold">Updated at:</span> {getConvertedDate(blogData.updatedAt)} </p>
                        {blogData.published &&
                            <p className="text-sm"><span className="text-base font-bold">Published on:</span> {getConvertedDate(blogData.publishedOn ?? "")} </p>
                        }
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                        <div className="opacity-50 flex items-center gap-3">
                            <p className="text-sm"> {getAgo(blogData.updatedAt)} </p>
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

                        <button type='button' onClick={() => setShowConfirmationModal(true)}
                            className="text-[#EF4444] p-2 px-3  
                            font-bold cursor-pointer 
                            hover:scale-102 transition-all
                            duration-500 ease-in-out flex gap-2">
                            <DeleteOutlined /> Delete
                        </button>
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


                <div className='lg:flex-1 relative h-200'>
                    <ContentEditor content={blogData.content} setBlogData={setBlogData} />
                    <button
                        type='button'
                        className="absolute bottom-0 right-0 m-3 rounded-full bg-green-200 p-3 font-bold group cursor-pointer"
                        onClick={handleAIGeneration}>
                        {aiContentLoading ? <span className="loader" /> :
                            <p>G<span className="hidden group-hover:inline">enerate Content</span></p>
                        }
                    </button>
                </div>
                <PictureUpload image={blogData.imageUrl} setBlogData={setBlogData} />

            </form>
        </>
    )
}


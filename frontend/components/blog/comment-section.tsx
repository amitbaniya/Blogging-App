'use client'

import { createComment, deleteComment } from "@/lib/comment"
import { useAppSelector } from "@/state/hooks"
import { commentDataTypes, RouteParams } from "@/types"
import { Avatar } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useParams } from "next/navigation"
import { FormEvent, useState } from "react"
import { DeleteOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { getAgo } from "@/utils"
import Link from "next/link"
import { useMounted } from "@/lib/hooks"
import { showToast } from "nextjs-toast-notify"


export default function CommentSection(
    { initialComments }:
        {
            initialComments: commentDataTypes[]
        }
) {
    const mounted = useMounted()
    const params = useParams<RouteParams>()
    const blogId = params.blogId;
    const [comments, setComments] = useState(initialComments ?? [])
    const [comment, setComment] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const user = useAppSelector(state => state.auth)
    async function addComment(e: FormEvent) {
        e.preventDefault();
        try {
            setIsLoading(true)
            setComments(prev => [{
                _id: "temp-" + Math.random(),
                author: {
                    _id: user._id,
                    name: user.name,
                    imageUrl: user.imageUrl,
                },
                content: comment,
                createdAt: new Date().toISOString()
            }, ...prev])

            const newComment = await createComment(blogId, comment)
            setComments([newComment, ...initialComments])
            setComment('')
        } catch (error) {
            console.log(error)
            setComments(initialComments)
            showToast.error("Error adding comments!", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            });
        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleDelete(commentId: string) {

        try {
            setIsLoading(true)
            await deleteComment(commentId)
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.log(error)
            showToast.error("Error deleting comments!", {
                duration: 4000,
                position: "top-center",
                transition: "bounceIn",
                progress: false
            })
        }
        finally {
            setIsLoading(false)
        }
    }
    if (!mounted) {
        return null
    }
    return (
        <section className="">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
                {/* <div className="flex gap-3">Sort by: Newest</div> */}
            </div>
            {user.isAuthenticated ?
                <form onSubmit={addComment} className="my-5">
                    <TextArea
                        autoSize={{ minRows: 5 }}
                        placeholder="Enter your comment"

                        name='comment'
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setComment(e.target.value) }}
                    />
                    <button className='bg-linear-to-r from-orange-600 to-orange-300
                            text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                            shadow-orange-500/50 cursor-pointer 
                            hover:scale-102 transition-all
                            duration-500 ease-in-out mt-5 flex gap-2 items-center disabled:opacity-50' disabled={isLoading}>{isLoading && <span className='loader' />}Submit</button>
                </form>
                :
                <div className="w-full flex flex-col p-10 border rounded-lg border-gray-500/50 justify-center items-center gap-2">
                    <div className="rounded-full w-10 h-10 flex justify-center items-center p-3 bg-gray-600/30"><LockOutlined /></div>
                    <p className="font-bold"> Want to share your thoughts?</p>
                    <p className="opacity-60">Sign in to leave a comment.</p>
                    <Link href='/auth' className="p-3 border rounded-xl animate-bounce mt-5 ">Login</Link>
                </div>
            }

            <div className="flex flex-col">
                {comments?.map((comment) => (
                    <div className="flex gap-3 py-5" key={comment._id}>
                        <Avatar size={40} icon={<UserOutlined />} src={comment.author.imageUrl} />
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <p className="font-bold">{comment.author.name} <span className="text-sm font-normal opacity-60">{getAgo(comment.createdAt)}</span></p>
                                {comment.author._id === user._id &&
                                    <button type="button" className="cursor-pointer disabled:opacity-50" onClick={() => { handleDelete(comment._id) }} disabled={isLoading}><DeleteOutlined /></button>

                                }
                            </div>
                            <p className="opacity-70">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
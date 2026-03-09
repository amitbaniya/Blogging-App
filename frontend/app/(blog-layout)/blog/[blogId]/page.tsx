import PurifiedContent from "@/components/blog/purified-content"
import { getBlog } from "@/lib/blog"
import { getConvertedDate } from "@/utils"
import { Avatar } from "antd"
import Image from "next/image"
import { redirect } from "next/navigation"
import { UserOutlined } from '@ant-design/icons';
import CommentSection from "@/components/blog/comment-section"
import RatingSection from "@/components/blog/rating-section"


export default async function BlogPage({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params
    let blog
    let comments = []
    const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_CLOUDINARY_IMAGE;
    try {
        if (blogId) {
            blog = await getBlog(blogId)
            comments = blog.comments
        }
    } catch (error) {
        console.log(error)
        redirect('/')
    }
    return (
        <>
            <main className="flex flex-col justify-center items-center">
                <div className=" w-full max-w-300 p-5  flex flex-col gap-10">
                    <h1 className="text-5xl font-bold">
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-3 ">
                        <Avatar
                            size={60}
                            src={blog.author.imageUrl}
                            icon={<UserOutlined />}
                        />
                        <div className="flex flex-col">
                            <p className="font-semibold">{blog.author.name}</p>
                            <p className="opacity-65 text-sm font-light">Published On {getConvertedDate(blog.publishedOn)}</p>
                        </div>
                    </div>

                    <div className="w-full h-100 relative overflow-hidden rounded-2xl bg-[#F7DFC7]">
                        <Image src={blog.imageUrl ? blog.imageUrl : defaultImage}
                            alt={blog.title} fill
                            className=" hover:scale-103 transition-all ease-in-out duration-300 object-contain" />
                    </div>

                    <div className="w-full rounded-2xl  bg-white border border-gray-400/40 p-15 text-lg max-md:p-5">
                        <PurifiedContent content={blog.content} short={false} />
                    </div>
                    <RatingSection initialRating={blog.rating} initialRatingCount={blog.ratingCount} />
                    <CommentSection initialComments={comments} commentCount={blog.commentCount} />
                </div>



            </main>
        </>
    )
}
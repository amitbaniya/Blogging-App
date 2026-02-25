import PurifiedContent from "@/components/blog/purified-content"
import { getBlog } from "@/lib/blog"
import { getConvertedDate } from "@/utils"
import { Avatar } from "antd"
import Image from "next/image"
import { redirect } from "next/navigation"


export default async function BlogPage({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params
    let blog

    try {
        if (blogId) {
            blog = await getBlog(blogId)
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
                        <Avatar size={60} src="https://res.cloudinary.com/dcplldqtr/image/upload/v1748832796/o6z442axowtlaowd1udj.gif" />
                        <div className="flex flex-col">
                            <p className="font-semibold">{blog.author.name}</p>
                            <p className="opacity-65 text-sm font-light">Published On {getConvertedDate(blog.publishedOn)}</p>
                        </div>
                    </div>
                    <div className="w-full h-100 relative overflow-hidden rounded-2xl">
                        <Image src="https://res.cloudinary.com/dcplldqtr/image/upload/v1759996125/h9ypyt8vm0eezusm0sh0.jpg"
                            alt={blog.title} fill
                            className="object-cover hover:scale-103 transition-all ease-in-out duration-300" />
                    </div>
                    <div className="w-full rounded-2xl  bg-white border border-gray-400/40 p-15 text-lg">
                        <PurifiedContent content={blog.content} short={false} />
                    </div>
                    <section className="">
                        <div className="flex justify-between">
                            <h2>Comments</h2>
                            <div className="flex gap-3">Sort by: Newest</div>
                        </div>
                        <form>
                            LEAVE A REVIEW
                        </form>
                        <div>
                            COMMENTLIST
                        </div>
                    </section>
                </div>



            </main>
        </>
    )
}
import { blogDataTypes } from "@/types";
import BlogCard from "./blog-card";

export default function BlogList({ blogList, publisher = false }: { blogList: blogDataTypes[], publisher: boolean }) {
    return (
        <>
            {
                blogList.length === 0 ? (
                    <p className="text-center py-10 font-bold text-gray-600">No blogs found</p>
                ) :
                    <div className="grid grid-cols-3 gap-5 w-full max-w-300 flex-wrap p-5 max-[900px]:grid-cols-2 max-[650px]:grid-cols-1 ">

                        {blogList?.map((blog) => (
                            <BlogCard blog={blog} key={blog._id} publisher={publisher} />
                        ))}
                    </div>
            }
        </>
    )
}
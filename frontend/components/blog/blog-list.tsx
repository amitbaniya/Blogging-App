import { blogDataTypes } from "@/types";
import BlogCard from "./blog-card";

export default function BlogList({ blogList }: { blogList: blogDataTypes[] }) {
    return (
        <div className="grid grid-cols-3 gap-5 w-full max-w-300 flex-wrap p-5 max-[900px]:grid-cols-2 max-[650px]:grid-cols-1 ">

            {blogList?.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </div>
    )
}
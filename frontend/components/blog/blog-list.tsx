import { blogDataTypes } from "@/types";
import BlogCard from "./blog-card";

export default function BlogList({ blogList }: { blogList: blogDataTypes[] }) {
    return (
        <div className="flex gap-5 w-full max-w-300 flex-wrap ">

            {blogList?.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </div>
    )
}
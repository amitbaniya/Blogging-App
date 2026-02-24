import { blogDataTypes } from "@/types";
import { Avatar, Card } from 'antd';
import PurifiedContent from "./purified-content";
import Link from "next/link";
import { Rate } from 'antd';
import { CommentOutlined } from '@ant-design/icons';


export default function BlogCard(
    { blog }: { blog: blogDataTypes }
) {
    return (
        <Link
            href={`/share-blog/${blog._id}`}
            className="flex-1 basis-75 flex hover:scale-102 transition-all duration-500 ease-in-out"
        >
            <Card
                className="flex flex-col w-full"
                styles={{
                    body: {
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    },
                }}
                cover={
                    <img
                        draggable={false}
                        alt="example"
                        src="https://res.cloudinary.com/dcplldqtr/image/upload/v1759996125/h9ypyt8vm0eezusm0sh0.jpg"
                        className="h-50 object-cover"
                    />
                }
            >
                <div className="flex items-center gap-3 font-semibold">
                    <Avatar src="https://res.cloudinary.com/dcplldqtr/image/upload/v1748832796/o6z442axowtlaowd1udj.gif" />
                    <p className="opacity-65">{blog.author.name}</p>
                </div>

                <div className="flex flex-col gap-3 my-3 flex-1 justify-between">
                    <h2 className="font-bold text-2xl">{blog.title}</h2>
                    <PurifiedContent content={blog.content} short />
                </div>

                <div className="flex justify-between text-base py-3 border-t border-t-gray-800/20 mt-4 font-semibold">
                    <div className="flex gap-2 items-center">
                        <Rate disabled defaultValue={blog.rating} size="small" />
                        {blog.rating}
                    </div>
                    <div className="flex gap-2 items-center">
                        <CommentOutlined />
                        {blog.commentCount}
                    </div>
                </div>
            </Card>
        </Link>


    )
}
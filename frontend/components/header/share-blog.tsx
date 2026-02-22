import { createBlog } from '@/lib/blog';
import { EditOutlined } from '@ant-design/icons';
import { redirect } from 'next/navigation';

export default function ShareBlogButton() {

    async function handleShareBlog() {
        try {
            console.log("initiating")
            const blogId = await createBlog();
            console.log(blogId)

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <button onClick={handleShareBlog}
            className="bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-2">
            <EditOutlined />Create Blog</button>
    )
}
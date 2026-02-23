
import BlogForm from '@/components/blog/blog-form';
import { getBlog } from '@/lib/blog';
import { redirect } from 'next/navigation';

export default async function ShareBlog({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params;
    let blog;
    try {
        blog = await getBlog(blogId)
    } catch (error) {
        console.log(error)
        redirect('/')
    }


    return (
        <main className='p-5 flex flex-col justify-center items-center'>
            <BlogForm blog={blog} />
        </main>

    )
}

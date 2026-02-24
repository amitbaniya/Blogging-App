
import BlogForm from '@/components/blog/blog-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ink & Insights | Share Blog',
    description: 'Page to share your own blog',
}

export default async function ShareBlog() {

    return (
        <main className='flex flex-col justify-center items-center h-full'>
            <BlogForm />
        </main>

    )
}

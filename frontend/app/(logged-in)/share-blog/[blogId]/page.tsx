


import { Input, Select } from 'antd';
import { Metadata } from 'next';
import classes from './share-blog.module.css'

export const metadata: Metadata = {
    title: 'Ink & Insights | Profile',
    description: 'Profile Page of a user where you can edit your profile information',
}
export default function ShareBlog() {
    return (
        <main className='p-5 flex flex-col justify-center items-center'>
            <form className='flex-1 h-full'>
                <Select
                    className={classes.select_field}
                    placeholder="Select a category"
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                    ]}
                />
                <Input type="text" className={classes.input_field} placeholder='Enter your blog title...'></Input>
                <div className='flex: 1'>
                    <textarea placeholder='Write your story here...' className='w-full' />
                </div>
                <span>ℹ️ TIP: USE MARKDOWN FOR FASTER FORMATTING</span>
            </form>
        </main>

    )
}

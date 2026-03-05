

import AuthForm from '@/components/auth/auth-form';
import authBackground from '@/assets/images/auth-background.png'
import Image from 'next/image';
import mainIcon from '@/app/icon.png'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Ink & Insights | Auth',
    description: 'Authentication Page, register or login. You can also change your passwrod if you have forgot your password.',
}

export default function AuthInternalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="grid w-full h-screen grid-cols-10 max-md:grid-cols-1 text-black p-0">
            <div className=' h-screen p-10 pr-40 max-md:h-32 col-span-4 flex flex-col justify-between'
                style={{
                    backgroundImage: `url(${authBackground.src})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className='flex items-center font-bold text-2xl gap-2'>
                    <div className='w-15'>
                        <Image src={mainIcon} alt='Main Icon' />
                    </div>
                    <Link href={'/'}><h1>Ink & Insights</h1></Link>
                </div>
                <div className='flex flex-col gap-7'>
                    <div className=' flex items-center gap-3 bg-gray-100/70 px-2 py-1 rounded-4xl border-gray-200 border w-fit'>
                        <li className='ml-4 text-orange-500 font-medium text-xs'>JOIN 50K+ CREATIVES</li>
                    </div>

                    <p className='text-5xl font-bold'>
                        Start your <span className='bg-linear-to-r from-orange-600 to-orange-300 text-orange-500/0 opacity-90 leading-15'>writing</span> journey today.
                    </p>

                    <p className='text-lg opacity-70'>
                        Join a community where every story matters. Share your voice and connect with readers around the world.
                    </p>


                </div>

                <div className='w-full flex items-center gap-3 bg-gray-100/70 p-3 rounded-2xl border-gray-200 border'>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div className='flex flex-col'>
                        <span className='text-s font-bold'>Recently Joined</span>
                        <span className='text-xs opacity-70'>12K author joined this month.</span>
                    </div>
                </div>

            </div>
            <div className='bg-white h-screen p-10 flex  items-center  col-span-6 justify-center max-md:items-start'>
                {children}
            </div>

        </div>

    )
}



import AuthForm from '@/components/auth/auth-form';
import authBackground from '@/assets/images/auth-background.png'
import Image from 'next/image';
import mainIcon from '@/app/icon.png'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ink & Insights | Auth',
    description: 'Authentication Page, register or login. You can also change your passwrod if you have forgot your password.',
}
export default function AuthPage() {
    return (
        <AuthForm />

    )
}

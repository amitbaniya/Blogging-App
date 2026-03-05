

import AuthForm from '@/components/auth/auth-form';
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

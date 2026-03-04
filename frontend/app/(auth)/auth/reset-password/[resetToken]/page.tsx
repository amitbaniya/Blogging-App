import ResetForm from '@/components/auth/reset-form';
import { resetPassword } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ink & Insights | Reset Password',
    description: 'Authentication Page, register or login. You can also reset your passwrod.',
}

export default async function ResetPasswordPage() {

    return (
        <ResetForm />

    )
}

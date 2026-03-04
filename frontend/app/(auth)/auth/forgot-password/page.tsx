import { Metadata } from 'next';
import { resetPasswordEmail } from '@/lib/auth';

import { redirect } from 'next/navigation';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';

export const metadata: Metadata = {
    title: 'Ink & Insights | Auth',
    description: 'Authentication Page, register or login. You can also change your passwrod if you have forgot your password.',
}



export default async function ForgotPasswordPage() {

    async function handleSend(email: string) {
        'use server'

        try {

            console.log(email)
            await resetPasswordEmail(email)
        } catch (error) {
            console.log(error)
        }

    }

    return (

        <ForgotPasswordForm onSubmit={handleSend} />
    )
}

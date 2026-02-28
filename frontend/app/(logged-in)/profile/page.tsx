import ProfilePictureForm from "@/components/auth/profile-picture-form";
import ProfileUpdateForm from "@/components/auth/profile-update-form";

export default function ProfilePage() {


    return (
        <main className="flex flex-col justify-center items-center ">
            <div className="w-full max-w-300 flex flex-col p-5 gap-10">
                <div>
                    <h1 className='font-bold text-4xl'>Edit Profile</h1>
                    <p className='opacity-60'>Manage your public identity and personal information across the platform.</p>
                </div>
                <ProfilePictureForm />
                <ProfileUpdateForm />

            </div>
        </main>

    )
}

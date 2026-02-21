
import Image from "next/image"
import { AuthProfile } from "./auth/auth-profile"
import mainIcon from "@/app/icon.png"
import Link from "next/link"
export default function MainHeader() {


    return (
        <header className="w-full flex justify-between bg-amber-50 p-3 text-black items-center">
            <Link className='flex items-center font-bold text-lg gap-2'
                href={'/'}>
                <div className='w-10 '>
                    <Image src={mainIcon} alt='Main Icon' />
                </div>
                <h1 className="text-black">Ink & Insights</h1>
            </Link>
            <AuthProfile />

        </header>
    )
}
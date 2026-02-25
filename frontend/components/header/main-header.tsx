

import Image from "next/image"
import mainIcon from "@/app/icon.png"
import Link from "next/link"
import { AuthHeader } from "./auth-profile-header";
export default function MainHeader() {

    return (
        <header className="w-full flex justify-center bg-amber-50 p-3 text-black items-center">
            <div className="flex gap-5 w-full max-w-300 justify-between ">
                <Link className='flex items-center font-bold text-lg gap-2'
                    href={'/'}>
                    <div className='w-10 '>
                        <Image src={mainIcon} alt='Main Icon' />
                    </div>
                    <h1 className="text-black">Ink & Insights</h1>
                </Link>
                <AuthHeader />
            </div>
        </header>
    )
}

import { AuthProfile } from "./auth/auth-profile"

export default function MainHeader() {


    return (
        <header className="w-full flex justify-between bg-amber-50 text-fuchsia-950 p-3 items-center">
            <div>
                INK & INSIGHTS
            </div>
            <AuthProfile />
        </header>
    )
}
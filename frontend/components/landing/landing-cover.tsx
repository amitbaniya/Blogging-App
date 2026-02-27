import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import CreateNewBlogButton from "../ui/create-button";

export default function LandingCover() {
    return (
        <div className="bg-[#F7DFC7] w-full flex justify-center ">
            <div className="w-full max-w-300 p-5 flex flex-col">
                <div className="w-full max-w-150 my-10 max-sm:my-2">
                    <h1 className="text-6xl font-bold my-5">
                        Share your voice.
                        <span className="text-orange-500"> Connect with creators.</span>
                    </h1>
                    <p className="my-5 text-xl opacity-65">
                        A minimalist space for thoughts, ideas, and stories. Read public feeds freely, or sign in to join the conversation and publish your own work.
                    </p>
                    <div className='w-full flex items-center gap-3'>
                        <CreateNewBlogButton colorStyle="bg-orange-600 shadow-lg shardow-orange-500/50">
                            Start Writing
                        </CreateNewBlogButton>
                        <Avatar size={30} icon={<UserOutlined />} />
                        <span className='text-xs opacity-70'>Joined by 12,000+ creators.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
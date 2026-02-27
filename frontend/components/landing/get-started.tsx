import CreateNewBlogButton from "../ui/create-button";

export default function GetStarted() {
    return (
        <div className="bg-[#ede2d8] w-full flex justify-center ">
            <div className="w-full max-w-300 p-5 flex justify-center flex-col text-center my-10 max-sm:my-3 ">

                <h1 className="text-4xl font-bold my-3">
                    Ready to share yours?

                </h1>
                <div className="w-full flex justify-center">
                    <p className="my-5 text-lg opacity-65 max-w-200">
                        Join thousands of others who are sharing their unfiltered thoughts. Create an account to start your journey.
                    </p>
                </div>
                <div className='w-full flex justify-center items-center gap-3'>
                    <CreateNewBlogButton colorStyle="bg-[#10B981]">Get Started</CreateNewBlogButton>

                </div>

            </div>
        </div>
    )
}
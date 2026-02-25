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
                    <button className="bg-[#10B981]
            text-white p-2 px-3 rounded-xl font-bold opacity-80  cursor-pointer 
            hover:scale-102 transition-all
            duration-500 ease-in-out">Get Started</button>
                </div>

            </div>
        </div>
    )
}
import BlogList from "@/components/blog/blog-list"
import { getPublisherBlogList } from "@/lib/blog"
import { Input } from "antd"

type PageProps = {
    searchParams: Promise<{
        searchText?: string
        startDate?: string
        endDate?: string
        pageNum?: string
    }>
}


export default async function BrowsePage({ searchParams }: PageProps) {
    const {
        searchText = "",
        startDate = "",
        endDate = "",
        pageNum = "1",
    } = await searchParams

    const currentPage = Number(pageNum)

    let blogList: any[] = []
    let totalPages = 1

    try {
        const data = await getPublisherBlogList(
            searchText,
            startDate,
            endDate,
            currentPage
        )

        blogList = data?.blogList || []
        totalPages = data?.totalPages || 1
    } catch (error) {
        console.error(error)
    }

    return (
        <main className="flex flex-col justify-center items-center">
            <div className="w-full max-w-300 flex flex-col">

                <form
                    method="GET"
                    className="rounded-2xl p-10 border border-gray-400/40 m-5 bg-[#F7DFC7] flex flex-col gap-5"
                >
                    <div className="flex gap-5">
                        <Input
                            type="text"
                            name="searchText"
                            placeholder="Search"
                            defaultValue={searchText}
                        />
                        <button
                            className="bg-linear-to-r from-orange-600 to-orange-300
                        text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                        shadow-orange-500/50 cursor-pointer 
                        hover:scale-102 transition-all
                        duration-500 ease-in-out flex gap-2"
                        >
                            Search
                        </button>
                    </div>

                    <div className="flex gap-10">
                        <Input type="date" name="startDate" defaultValue={startDate} />
                        <Input type="date" name="endDate" defaultValue={endDate} />
                    </div>

                    <input type="hidden" name="pageNum" value="1" />
                </form>

                {blogList.length === 0 ? (
                    <p className="text-center py-10 font-bold text-gray-600">
                        No blogs found
                    </p>
                ) : (
                    <>
                        <BlogList blogList={blogList} publisher={true} />

                        <div className="flex justify-center gap-4 my-8">

                            {currentPage > 1 && (
                                <form method="GET">
                                    <input type="hidden" name="searchText" value={searchText} />
                                    <input type="hidden" name="startDate" value={startDate} />
                                    <input type="hidden" name="endDate" value={endDate} />
                                    <input type="hidden" name="pageNum" value={currentPage - 1} />
                                    <button className="px-4 py-2 border rounded-lg cursor-pointer">
                                        Prev
                                    </button>
                                </form>
                            )}

                            <span className="px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>

                            {currentPage < totalPages && (
                                <form method="GET">
                                    <input type="hidden" name="searchText" value={searchText} />
                                    <input type="hidden" name="startDate" value={startDate} />
                                    <input type="hidden" name="endDate" value={endDate} />
                                    <input type="hidden" name="pageNum" value={currentPage + 1} />
                                    <button className="px-4 py-2 border rounded-lg cursor-pointer">
                                        Next
                                    </button>
                                </form>
                            )}

                        </div>
                    </>
                )}
            </div>
        </main>
    )
}
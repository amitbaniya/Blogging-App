import BlogList from "@/components/blog/blog-list"
import { getBlogList } from "@/lib/blog"
import { Input } from "antd";


type PageProps = {
    searchParams: Promise<{
        searchText?: string
        startDate?: string
        endDate?: string
        pageNum?: string
    }>
}

export const dynamic = 'force-dynamic';

export default async function BrowsePage({ searchParams }: PageProps) {
    const { searchText, startDate, endDate, pageNum = "1" } = await searchParams
    let data
    const currentPage = Number(pageNum)
    try {
        data = await getBlogList(searchText, startDate, endDate, currentPage)
    } catch (error) {
        console.log(error)
    }
    if (!data) return null

    const { blogList, totalPages } = data

    return (
        <>
            <main className="flex flex-col justify-center items-center">
                <div className=" w-full max-w-300  flex flex-col">
                    <form className=" rounded-2xl p-10 border border-gray-400/40 m-5 bg-[#F7DFC7] flex flex-col gap-5" id="search-form">
                        <div className="flex gap-5">
                            <Input type="text" name='searchText' placeholder="Search" key={searchText} defaultValue={searchText} />
                            <button
                                className="bg-linear-to-r from-orange-600 to-orange-300
                                text-white p-2 px-3 rounded-xl font-bold opacity-80 shadow-lg
                                shadow-orange-500/50 cursor-pointer 
                                hover:scale-102 transition-all
                                duration-500 ease-in-out flex gap-2">
                                Search
                            </button>

                        </div>
                        <div className="flex gap-10">
                            <Input type="date" name='startDate' defaultValue={startDate} />
                            <Input type="date" name='endDate' defaultValue={endDate} />
                        </div>
                        <input type="hidden" name="pageNum" value={currentPage} />
                    </form>

                    <BlogList blogList={blogList} />
                    <div className="flex justify-center gap-4 my-8">

                        {currentPage > 1 && (
                            <form>
                                <input type="hidden" name="searchText" value={searchText} />
                                <input type="hidden" name="startDate" value={startDate} />
                                <input type="hidden" name="endDate" value={endDate} />
                                <input type="hidden" name="pageNum" value={currentPage - 1} />
                                <button className="px-4 py-2 border rounded-lg">
                                    Prev
                                </button>
                            </form>
                        )}

                        <span className="px-4 py-2">
                            Page {currentPage} of {totalPages}
                        </span>

                        {currentPage && currentPage < totalPages && (
                            <form>
                                <input type="hidden" name="searchText" value={searchText} />
                                <input type="hidden" name="startDate" value={startDate} />
                                <input type="hidden" name="endDate" value={endDate} />
                                <input type="hidden" name="pageNum" value={currentPage + 1} />
                                <button className="px-4 py-2 border rounded-lg">
                                    Next
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main >
        </>
    )
}
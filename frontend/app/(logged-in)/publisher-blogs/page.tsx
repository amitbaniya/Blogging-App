"use client"

import BlogList from "@/components/blog/blog-list"
import { getPublisherBlogList } from "@/lib/blog"
import { Input } from "antd"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function BrowsePage() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const initSearchText = searchParams.get("searchText") || ""
    const initStartDate = searchParams.get("startDate") || ""
    const initEndDate = searchParams.get("endDate") || ""
    const initPageNum = Number(searchParams.get("pageNum") || "1")

    const [blogList, setBlogList] = useState<any[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(initPageNum)
    const [searchText, setSearchText] = useState(initSearchText)
    const [startDate, setStartDate] = useState(initStartDate)
    const [endDate, setEndDate] = useState(initEndDate)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true)
            try {
                const data = await getPublisherBlogList(searchText, startDate, endDate, currentPage)
                setBlogList(data.blogList || [])
                setTotalPages(data.totalPages || 1)
            } catch (error) {
                console.error(error)
                setBlogList([])
                setTotalPages(1)
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [searchText, startDate, endDate, currentPage])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const newSearchText = (form.elements.namedItem("searchText") as HTMLInputElement).value
        const newStartDate = (form.elements.namedItem("startDate") as HTMLInputElement).value
        const newEndDate = (form.elements.namedItem("endDate") as HTMLInputElement).value

        setSearchText(newSearchText)
        setStartDate(newStartDate)
        setEndDate(newEndDate)
        setCurrentPage(1)

        const params = new URLSearchParams()
        if (newSearchText) params.set("searchText", newSearchText)
        if (newStartDate) params.set("startDate", newStartDate)
        if (newEndDate) params.set("endDate", newEndDate)
        params.set("pageNum", "1")
        router.push(`/publisher-blogs?${params.toString()}`)

    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)

        const params = new URLSearchParams()
        if (searchText) params.set("searchText", searchText)
        if (startDate) params.set("startDate", startDate)
        if (endDate) params.set("endDate", endDate)
        params.set("pageNum", newPage.toString())
        router.push(`/publisher-blogs?${params.toString()}`)
    }

    return (
        <main className="flex flex-col justify-center items-center">
            <div className="w-full max-w-300 flex flex-col">
                <form
                    onSubmit={handleSearch}
                    className="rounded-2xl p-10 border border-gray-400/40 m-5 bg-[#F7DFC7] flex flex-col gap-5"
                    id="search-form"
                >
                    <div className="flex gap-5">
                        <Input type="text" name="searchText" placeholder="Search" defaultValue={searchText} />
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
                </form>

                {loading ? (
                    <p className="text-center py-10">Loading blogs...</p>
                ) : blogList.length === 0 ? (
                    <p className="text-center py-10 font-bold text-gray-600">No blogs found</p>
                ) : (
                    <>
                        <BlogList blogList={blogList} publisher={true} />
                        <div className="flex justify-center gap-4 my-8">
                            {currentPage > 1 && (
                                <button className="px-4 py-2 border rounded-lg" onClick={() => handlePageChange(currentPage - 1)}>
                                    Prev
                                </button>
                            )}

                            <span className="px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>

                            {currentPage < totalPages && (
                                <button className="px-4 py-2 border rounded-lg" onClick={() => handlePageChange(currentPage + 1)}>
                                    Next
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}
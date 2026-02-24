

import BlogList from "@/components/blog/blog-list";
import MainHeader from "@/components/header/main-header"
import { getBlogList } from "@/lib/blog";

export default async function HomePage() {
  let blogList;
  try {
    blogList = await getBlogList()
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      <MainHeader />
      <main className="flex flex-col justify-center items-center p-5">
        <BlogList blogList={blogList} />
      </main>
    </>
  )
}

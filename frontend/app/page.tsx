

import BlogList from "@/components/blog/blog-list";
import MainHeader from "@/components/header/main-header"
import { getBlogList } from "@/lib/blog";
import LandingCover from "@/components/landing/landing-cover";
import GetStarted from "@/components/landing/get-started";
import DefaultFooter from "@/components/Footer/default-footer";
import Link from "next/link";


export default async function HomePage() {
  let data;
  try {
    data = await getBlogList()
  } catch (error) {
    console.log(error)
  }

  let blogList = []
  if (data) {
    blogList = data.blogList;
  }
  return (
    <>
      <MainHeader />
      <main className="flex flex-col justify-center items-center">
        <LandingCover />
        <BlogList blogList={blogList} publisher={false} />
        {blogList.length === 9 &&
          <div className="flex justify-center p-5">
            <Link href='/browse' className="p-5 border rounded-xl animate-bounce cursor-pointer">Browse More</Link>
          </div>
        }
        <GetStarted />
        <DefaultFooter />
      </main>
    </>
  )
}



import BlogList from "@/components/blog/blog-list";
import MainHeader from "@/components/header/main-header"
import { getBlogList } from "@/lib/blog";
import LandingCover from "@/components/landing/landing-cover";
import GetStarted from "@/components/landing/get-started";
import DefaultFooter from "@/components/Footer/default-footer";

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
      <main className="flex flex-col justify-center items-center">
        <LandingCover />
        <BlogList blogList={blogList} />
        <GetStarted />
        <DefaultFooter />
      </main>
    </>
  )
}

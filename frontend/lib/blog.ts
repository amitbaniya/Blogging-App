import { blogDataTypes } from "@/types";
import api from "./axios";

export async function createBlog() {
  try {
    const response = await api.post("/blog/create");
    return response.data.blogId;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getPublisherBlog(blogId: string) {
  try {
    const response = await api.get(`/blog/get/publisher/${blogId}`);
    return response.data.blog;
  } catch (error: any) {
    console.log("get Error", error);
    throw error;
  }
}

export async function saveBlog(blogId: string, blog: blogDataTypes) {
  try {
    const response = await api.patch(`/blog/save/${blogId}`, blog);
    return response.data.updatedAt;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function publishBlog(blogId: string) {
  try {
    const response = await api.patch(`/blog/publish/${blogId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getBlogList(
  searchText: string = "",
  startDate: string = "",
  endDate: string = "",
  currentPage: number = 1,
) {
  try {
    const response = await api.get(
      `/blog/get?searchText=${searchText}&startDate=${startDate}&endDate=${endDate}&pageNum=${currentPage}`,
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getBlog(blogId: string) {
  try {
    const response = await api.get(`/blog/get/${blogId}`);
    return response.data.blog;
  } catch (error: any) {
    console.log("get Error", error);
    throw error;
  }
}

export async function savePicture(blogId: string, file: File) {
  try {
    const formData = new FormData();
    formData.append("blog", file);
    const response = await api.patch(
      `/blog/picture-upload/${blogId}`,
      formData,
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

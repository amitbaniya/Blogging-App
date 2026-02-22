import { redirect } from "next/navigation";
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

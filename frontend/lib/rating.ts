import api from "./axios";
import Revalidation from "./revalidation";

export async function getRating(blogId: string) {
  try {
    const response = await api.get(`/rating/get/${blogId}`);
    return response.data.rating;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function saveRating(blogId: string, rating: number) {
  try {
    const response = await api.post(`/rating/save/${blogId}`, { rating });
    await Revalidation([`blog-${blogId}`, "blogList"]);
    return response.data.rating;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

import api from "./axios";
import Revalidation from "./revalidation";

export async function createComment(blogId: string, content: string) {
  try {
    const response = await api.post(`/comment/create/${blogId}`, { content });
    await Revalidation([`blog-${blogId}`, "blogList"]);
    return response.data.comment;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function deleteComment(commentId: string, blogId: string) {
  try {
    const response = await api.delete(`/comment/remove/${commentId}`);
    await Revalidation([`blog-${blogId}`, "blogList"]);
    return response.data.comment;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getComments(blogId: string, lastCommentId: string) {
  try {
    const response = await api.get(
      `/comment/more/${blogId}?lastCommentId=${lastCommentId}`,
    );
    return response.data.comments;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

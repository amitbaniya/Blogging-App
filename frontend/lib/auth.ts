import { authFormTypes, userDataTypes } from "@/types";
import api from "./axios";

export async function registerSubmit(data: authFormTypes) {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function loginSubmit(data: authFormTypes) {
  try {
    const response = await api.post("/auth/login", data);
    return response.data.user;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function getUserInformation() {
  try {
    const response = await api.get("/auth/me");
    return response.data.user;
  } catch (error: any) {
    console.log("getUserInformation error:", error.message);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (error: any) {
    console.log("logout error:", error.message);
    throw error;
  }
}

export async function saveProfilePicture(file: File) {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.patch("/auth/picture-upload", formData);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function saveUser(user: userDataTypes) {
  try {
    const response = await api.patch("/auth/update", user);
    return response.data.updatedAt;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function resetPasswordEmail(email: string) {
  try {
    const response = await api.post("/auth/reset-password-email", { email });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const response = await api.patch(`/auth/reset-password/${token}`, {
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

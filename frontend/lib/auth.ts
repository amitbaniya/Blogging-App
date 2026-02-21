import { authFormTypes } from "@/types";
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

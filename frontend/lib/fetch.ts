"use server";

import { FetchOptions, fetchType } from "@/types";
import { cookies } from "next/headers";

export default async function fetchAPI(
  url: string,
  method: fetchType,
  body?: {},
  options?: FetchOptions,
) {
  try {
    const completeURL = process.env.NEXT_PUBLIC_API_URL + url;
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const nextOptions: any = {};
    if (options?.revalidate) nextOptions.revalidate = options.revalidate;
    if (options?.tags) nextOptions.tags = options.tags;
    if (options?.noCache) nextOptions.cache = "no-store";

    const response = await fetch(completeURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString,
      },
      credentials: "include",
      ...(method !== fetchType.GET && { body: JSON.stringify(body) }),
      ...(Object.keys(nextOptions).length > 0 ? { next: nextOptions } : {}),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Request failed");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Something went wrong");
  }
}

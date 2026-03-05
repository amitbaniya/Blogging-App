"use server";
import { revalidateTag } from "next/cache";

export default async function Revalidation(tags: string[]) {
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }
}

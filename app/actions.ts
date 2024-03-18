"use server";

import { revalidatePath } from "next/cache";

export async function redirect_to_issues_page(path: string) {
  revalidatePath(path);
}

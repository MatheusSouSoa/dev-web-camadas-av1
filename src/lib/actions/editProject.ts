"use server";

import { revalidatePath } from "next/cache";

export async function editProject(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/projects");

  await fetch(`http://localhost:3000/api/projects`, {
    method: "PUT",
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  return true;
}

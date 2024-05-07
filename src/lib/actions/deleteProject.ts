"use server";

import { revalidatePath } from "next/cache";

export async function deleteProject(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/projects");

  await fetch(`http://localhost:3000/api/projects/${formData.get("id")}`, {
    method: "DELETE",
  });

  return true;
}

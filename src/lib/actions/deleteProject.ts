"use server";

import { revalidatePath } from "next/cache";

export async function deleteProject(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/projects");

  await fetch(`http://localhost:8080/api-v1-0/projetos/${formData.get("id")}`, {
    method: "DELETE",
  });

  return true;
}

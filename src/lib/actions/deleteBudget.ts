"use server";

import { revalidatePath } from "next/cache";

export async function deleteBudget(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/budgets");
  revalidatePath("/projects");

  const req = await fetch(
    `http://localhost:8080/api-v1-0/orcamentos/${formData.get("id")}`,
    {
      method: "DELETE",
    }
  );

  console.log(req.status);

  return true;
}

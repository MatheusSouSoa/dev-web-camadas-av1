"use server";

import { revalidatePath } from "next/cache";

export async function deleteBudget(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/budgets");

  await fetch(`http://localhost:3000/api/budgets/${formData.get("id")}`, {
    method: "DELETE",
  });

  return true;
}

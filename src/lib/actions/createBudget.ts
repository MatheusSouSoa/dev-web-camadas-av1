"use server";

import { revalidatePath } from "next/cache";

export async function createBudget(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/budgets");

  await fetch("http://localhost:3000/api/budgets", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  return true;
}

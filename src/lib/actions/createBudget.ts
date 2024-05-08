"use server";

import { revalidatePath } from "next/cache";

export async function createBudget(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/budgets");
  revalidatePath("/projects");

  await fetch("http://localhost:8080/api-v1-0/orcamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome_empresa: formData.get("company"),
      valor: formData.get("value"),
      descricao: formData.get("description"),
      status: formData.get("status"),
      codigo_projeto: formData.get("project"),
    }),
  });

  return true;
}

"use server";

import { revalidatePath } from "next/cache";

export async function editBudget(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/budgets");

  await fetch(
    `http://localhost:8080/api-v1-0/orcamentos/${formData.get("id")}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_empresa: formData.get("company"),
        valor: formData.get("value"),
        descricao: formData.get("description"),
        status_pagamento: formData.get("status"),
      }),
    }
  );

  return true;
}

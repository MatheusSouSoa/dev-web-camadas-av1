"use server";

import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/projects");

  await fetch("http://localhost:8080/api-v1-0/projetos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: formData.get("name"),
      data_inicio: formData.get("startDate"),
      data_termino: formData.get("endDate"),
      descricao: formData.get("description"),
      status: formData.get("status"),
    }),
  });

  return true;
}

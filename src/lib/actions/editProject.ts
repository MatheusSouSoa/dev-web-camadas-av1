"use server";

import { revalidatePath } from "next/cache";

export async function editProject(formData: FormData) {
  revalidatePath("/");
  revalidatePath("/projects");

  console.log(`http://localhost:8080/api-v1-0/projetos/${formData.get("id")}`);

  await fetch(`http://localhost:8080/api-v1-0/projetos/${formData.get("id")}`, {
    method: "PUT",
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

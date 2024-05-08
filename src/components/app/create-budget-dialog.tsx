"use client";

import { Select } from "@/components/app/select";
import { SubmitButton } from "@/components/app/submit-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBudget } from "@/lib/actions/createBudget";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Project } from "@/@types/Project";

export function CreateBudgetDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Array<Project> | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api-v1-0/projetos`)
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Orçamento</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          action={async (formData: FormData) => {
            await createBudget(formData);
            setOpen(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Projeto</Label>
            {projects && (
              <Select
                placeholder="Projeto"
                name="project"
                options={projects
                  .filter((item) => !item.codigo_orcamento)
                  .map((item) => {
                    return {
                      label: item.nome,
                      value: item.codigo.toString(),
                    };
                  })}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              name="company"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="value">Valor</Label>
            <Input
              type="number"
              id="value"
              name="value"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Status</Label>
            <Select
              placeholder="Status"
              name="status"
              options={[
                {
                  label: "Pendente",
                  value: "Pendente",
                },
                {
                  label: "Pago",
                  value: "Pago",
                },
                {
                  label: "Atrasado",
                  value: "Atrasado",
                },
              ]}
            />
          </div>
          <SubmitButton>Cadastrar Orçamento</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

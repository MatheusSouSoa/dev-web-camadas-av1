"use client";

import { Budget } from "@/@types/Budget";
import { Select } from "@/components/app/select";
import { SubmitButton } from "@/components/app/submit-button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editBudget } from "@/lib/actions/editBudget";
import { ReactNode, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

export function EditBudgetDialog({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState<Budget | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api-v1-0/orcamentos/${id}`)
      .then((response) => response.json())
      .then((data) => setBudget(data));
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      {budget && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Orçamento</DialogTitle>
            <DialogDescription>
              Faça alterações em seu orçamento aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            action={async (formData: FormData) => {
              await editBudget(formData);
              setOpen(false);
            }}
          >
            <input
              type="hidden"
              name="id"
              value={id}
            />

            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                defaultValue={budget.nome_empresa}
                id="company"
                name="company"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="value">Valor</Label>
              <Input
                defaultValue={budget.valor}
                type="number"
                id="value"
                name="value"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                defaultValue={budget.descricao}
                id="description"
                name="description"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Status</Label>
              <Select
                defaultValue={budget.status_pagamento}
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
            <SubmitButton>Salvar alterações</SubmitButton>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

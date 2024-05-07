"use client";

import { Select } from "@/components/app/select";
import { SubmitButton } from "@/components/app/submit-button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/lib/actions/createProject";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";
import { Textarea } from "../ui/textarea";

export function CreateProjectDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 py-4"
          action={async (formData: FormData) => {
            await createProject(formData);
            setOpen(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Data de início</Label>
            <DatePicker name="startDate" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="startDate">Data de término</Label>
            <DatePicker name="endDate" />
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
                  label: "Pronto",
                  value: "Pronto",
                },
                {
                  label: "Em Andamento",
                  value: "Em Andamento",
                },
                {
                  label: "Pausado",
                  value: "Pausado",
                },
              ]}
            />
          </div>

          <SubmitButton>Cadastrar Projeto</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Project } from "@/@types/Project";
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
import { editProject } from "@/lib/actions/editProject";
import { ReactNode, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

export function EditProjectDialog({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/projects/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data));
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      {project && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
            <DialogDescription>
              Faça alterações em seu projeto aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            action={async (formData: FormData) => {
              await editProject(formData);
              setOpen(false);
            }}
          >
            <input
              type="hidden"
              name="id"
              value={id}
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                defaultValue={project?.name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Data de início</Label>
              <DatePicker
                name="startDate"
                defaultValue={project?.startDate}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Data de término</Label>
              <DatePicker
                name="endDate"
                defaultValue={project?.endDate}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                defaultValue={project?.description}
                id="description"
                name="description"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="startDate">Status</Label>
              <Select
                defaultValue={project?.status}
                name="status"
                placeholder="Status"
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
            <SubmitButton>Salvar alterações</SubmitButton>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

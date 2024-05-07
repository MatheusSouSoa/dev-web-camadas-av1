import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Project } from "@/@types/Project";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreateProjectDialog } from "@/components/app/create-project-dialog";
import { DeleteProjectDialog } from "@/components/app/delete-project-dialog";
import { EditProjectDialog } from "@/components/app/edit-project-dialog";

export const dynamic = "force-dynamic";

export default async function Projects() {
  const projects: Array<Project> = await (
    await fetch("http://localhost:3000/api/projects")
  ).json();

  return (
    <div className="flex-1 flex p-4">
      <div className="bg-white p-4 flex-1 border flex flex-col gap-4 border-zinc-200 rounded-sm">
        <header className="flex justify-between">
          <h2 className="font-bold text-lg">Projetos</h2>
          <CreateProjectDialog>
            <Button>Adicionar novo</Button>
          </CreateProjectDialog>
        </header>

        <ScrollArea className="flex-1">
          <Table>
            {!projects.length && (
              <TableCaption>Nenhum projeto adicionado ainda.</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Data de início</TableHead>
                <TableHead>Data de término</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map(({ id, name, startDate, endDate, status }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    <Link
                      href=""
                      className="hover:underline underline-offset-2"
                    >
                      {id}
                    </Link>
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    {format(startDate, "PPP", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    {format(endDate, "PPP", { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        status == "Pendente" || status == "Pausado"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-4">
                    <EditProjectDialog id={id}>
                      <Button
                        variant="secondary"
                        className="px-0 aspect-square"
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                    </EditProjectDialog>

                    <DeleteProjectDialog id={id}>
                      <Button
                        variant="destructive"
                        className="px-0 aspect-square"
                      >
                        <Trash className="w-5 h-5" />
                      </Button>
                    </DeleteProjectDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

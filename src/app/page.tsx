import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

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
import { Project } from "@/@types/Project";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Budget } from "@/@types/Budget";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects: Array<Project> = await (
    await fetch("http://localhost:8080/api-v1-0/projetos")
  ).json();

  const budgets: Array<Budget> = await (
    await fetch("http://localhost:8080/api-v1-0/orcamentos")
  ).json();

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <div className="flex-1 overflow-hidden flex flex-col gap-4 bg-white border border-zinc-200 rounded-sm p-4">
        <header className="flex justify-between">
          <h2 className="font-bold text-lg">Últimos Projetos</h2>

          <Link
            href="/projects"
            className="underline underline-offset-2"
          >
            Ver mais
          </Link>
        </header>

        <ScrollArea className="flex-1">
          <Table>
            {!projects.length && (
              <TableCaption>Nenhum projeto adicionado ainda.</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Orçamento</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Data de início</TableHead>
                <TableHead>Data de término</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects
                .slice(0, 10)
                .map(
                  ({
                    codigo,
                    nome,
                    data_inicio,
                    data_termino,
                    status,
                    codigo_orcamento,
                  }) => (
                    <TableRow key={codigo}>
                      <TableCell className="font-medium">
                        <Link
                          href=""
                          className="hover:underline underline-offset-2"
                        >
                          {codigo}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link
                          href=""
                          className="hover:underline underline-offset-2"
                        >
                          {codigo_orcamento}
                        </Link>
                      </TableCell>
                      <TableCell>{nome}</TableCell>
                      <TableCell>
                        {format(data_inicio, "PPP", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {format(data_termino, "PPP", { locale: ptBR })}
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
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      <div className="flex-1 bg-white flex flex-col gap-4 border border-zinc-200 rounded-sm p-4">
        <header className="flex justify-between">
          <h2 className="font-bold text-lg">Últimos Orçamentos</h2>

          <Link
            href="/budgets"
            className="underline underline-offset-2"
          >
            Ver mais
          </Link>
        </header>

        <ScrollArea className="flex-1">
          <Table>
            {!budgets.length && (
              <TableCaption>Nenhum orçamento adicionado ainda.</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status do pagamento</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {budgets
                .slice(0, 10)
                .map(({ codigo, nome_empresa, valor, status_pagamento }) => (
                  <TableRow key={codigo}>
                    <TableCell className="font-medium">
                      <Link
                        href=""
                        className="hover:underline underline-offset-2"
                      >
                        {codigo}
                      </Link>
                    </TableCell>
                    <TableCell>{nome_empresa}</TableCell>
                    <TableCell>{valor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status_pagamento == "Pendente" ||
                          status_pagamento == "Pausado"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {status_pagamento}
                      </Badge>
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

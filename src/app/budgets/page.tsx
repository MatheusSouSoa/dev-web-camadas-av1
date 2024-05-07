import { Button } from "@/components/ui/button";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Budget } from "@/@types/Budget";
import { EditBudgetDialog } from "@/components/app/edit-budget-dialog";
import { DeleteBudgetDialog } from "@/components/app/delete-budget-dialog";
import { CreateBudgetDialog } from "@/components/app/create-budget-dialog";

export default async function Budgets() {
  const budgets: Array<Budget> = await (
    await fetch("http://localhost:8080/api-v1-0/orcamentos")
  ).json();

  return (
    <div className="flex-1 flex p-4">
      <div className="bg-white p-4 flex-1 flex gap-4 flex-col border border-zinc-200 rounded-sm">
        <header className="flex justify-between">
          <h2 className="font-bold text-lg">Orçamentos</h2>
          <CreateBudgetDialog>
            <Button>Adicionar novo</Button>
          </CreateBudgetDialog>
        </header>

        <ScrollArea className="flex-1">
          <Table>
            {!budgets.length && (
              <TableCaption>Nenhum orçamento adicionado ainda.</TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status do pagamento</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {budgets.map(
                ({ codigo, nome_empresa, valor, status_pagamento }) => (
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
                    <TableCell className="flex gap-4">
                      <EditBudgetDialog id={codigo}>
                        <Button
                          variant="secondary"
                          className="px-0 aspect-square"
                        >
                          <Pencil className="w-5 h-5" />
                        </Button>
                      </EditBudgetDialog>

                      <DeleteBudgetDialog id={codigo}>
                        <Button
                          variant="destructive"
                          className="px-0 aspect-square"
                        >
                          <Trash className="w-5 h-5" />
                        </Button>
                      </DeleteBudgetDialog>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

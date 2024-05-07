import { budgetRepository } from "../../../../repositories/BudgetRepository";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  budgetRepository.delete(params.id);
  return Response.json(params.id);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const budget = budgetRepository.findById(params.id);
  return Response.json(budget);
}

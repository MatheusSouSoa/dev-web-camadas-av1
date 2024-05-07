import { v4 } from "uuid";
import { budgetRepository } from "../../../repositories/BudgetRepository";

export async function POST(request: Request) {
  const { company, value, status, description } = await request.json();

  const budget = {
    id: v4(),
    company,
    value,
    status,
    description,
  };

  budgetRepository.add(budget);

  return Response.json(budget);
}

export async function PUT(request: Request) {
  const { id, company, value, status, description } = await request.json();

  const budget = budgetRepository.edit({
    id,
    company,
    value,
    status,
    description,
  });

  return Response.json(budget);
}

export async function GET() {
  const budgets = budgetRepository.findAll();
  return Response.json(budgets);
}

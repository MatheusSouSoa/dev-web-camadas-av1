import { Budget } from "@/@types/Budget";

class BudgetRepository {
  private budgets: Array<Budget> = [];

  add(budget: Budget) {
    this.budgets = [...this.budgets, budget];
  }

  findById(id: string) {
    return this.budgets.find((item) => item.id == id) || null;
  }

  findAll() {
    return this.budgets;
  }

  delete(id: string) {
    this.budgets = this.budgets.filter((item) => item.id != id);
  }

  edit(changedbudget: Budget) {
    const budgetIndex = this.budgets.findIndex((item) => {
      return item.id == changedbudget.id;
    });

    if (budgetIndex != -1) {
      this.budgets[budgetIndex] = changedbudget;
      return changedbudget;
    }

    return null;
  }
}

export const budgetRepository = new BudgetRepository();

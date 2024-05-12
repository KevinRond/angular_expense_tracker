import { Component } from '@angular/core';
import { EXPENSES } from '../mock-expenses';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  expenses: Expense[] = [];
  total: number = 0;
  constructor(private expenseService: ExpenseService) {}

  getExpenses(): void {
    this.expenses = this.expenseService.getExpenses();
  }

  getTotal(): void {
    this.total = this.expenseService.getTotal();
  }

  updateTotal(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  ngOnInit(): void {
    this.getExpenses();
    this.getTotal();
  }

  delete(expense: Expense): void {
    this.expenses = this.expenses.filter((exp) => exp !== expense );
    this.total = this.updateTotal();
  }
}

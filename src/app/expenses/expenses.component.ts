import { Component } from '@angular/core';
import { EXPENSES } from '../mock-expenses';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  expenses: Expense[] = [];
  total: number = 0;

  constructor(private expenseService: ExpenseService) {}

  // getExpenses(): void {
  //   this.expenseService
  //     .getExpenses()
  //     .subscribe((expenses) => (this.expenses = expenses));
  //   this.getTotal();
  // }

  getTotal(): void {
    this.expenseService.getTotal().subscribe((total) => (this.total = total));
  }

  ngOnInit(): void {
    this.expenseService
      .getExpenses()
      .pipe(
        switchMap((expenses) => {
          this.expenses = expenses;
          return this.expenseService.getTotal();
        })
      )
      .subscribe((total) => (this.total = total));
  }

  delete(expense: Expense): void {
    this.expenses = this.expenses.filter((exp) => exp !== expense);
    this.expenseService.setExpenses(this.expenses);
    this.getTotal();
  }
}

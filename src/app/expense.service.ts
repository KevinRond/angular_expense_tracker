import { Injectable } from '@angular/core';
import { EXPENSES } from './mock-expenses';
import { Observable } from 'rxjs';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor() {}

  getExpenses(): Expense[] {
    return EXPENSES;
  }

  getTotal(): number {
    return EXPENSES.reduce((total, expense) => total + expense.amount, 0);
  }
}

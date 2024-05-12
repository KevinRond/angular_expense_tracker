import { Injectable } from '@angular/core';
import { EXPENSES } from './mock-expenses';
import { BehaviorSubject, Observable, filter, of } from 'rxjs';
import { Expense } from './expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private selectedCategory: string = 'All Categories';
  private expensesSubject: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>(
    []
  );
  private expenses: Expense[] = EXPENSES;
  

  constructor() {
    this.filterExpenses();
  }

  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  setExpenses(expenses: Expense[]){
    this.expenses = expenses;
    this.expensesSubject.next(expenses);
  }

  getSelectedCategory(): string {
    return this.selectedCategory;
  }

  getTotal(): Observable<number> {
    const expensesTotal = this.expensesSubject.getValue().reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return of(expensesTotal);
  }

  setSelectedCategory(category: string): void {
    this.selectedCategory = category;
    this.filterExpenses();
  }

  private filterExpenses(): Expense[] {
    const filteredExpenses =
      this.selectedCategory === 'All Categories'
        ? this.expenses
        : this.expenses.filter(
            (expense) => expense.category === this.selectedCategory
          );
    this.expensesSubject.next(filteredExpenses);
    return filteredExpenses;
  }
}

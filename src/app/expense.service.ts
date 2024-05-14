import { Injectable } from '@angular/core';
import { EXPENSES } from './mock-expenses';
import { BehaviorSubject, Observable, filter, of } from 'rxjs';
import { Expense } from './expense';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private selectedCategory: string = 'All Categories';
  private expensesSubject: BehaviorSubject<Expense[]> = new BehaviorSubject<
    Expense[]
  >([]);
  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private expenses: Expense[] = EXPENSES;
  private usedIds: Number[] = this.expenses.map((expense) => expense.id);

  constructor(private messageService: MessageService) {
    this.filterExpenses();
    this.calculateTotal();
  }

  getIds(): Number[] {
    return this.usedIds;
  }

  getExpenses(): Observable<Expense[]> {
    return this.expensesSubject.asObservable();
  }

  setExpenses(expenses: Expense[]) {
    this.expenses = expenses;
    this.expensesSubject.next(expenses);
  }

  addExpense(expense: Expense) {
    this.expenses = [...this.expenses, expense];
    this.expenses.map((exp) => this.messageService.add(`New expenses amount are: ${exp.amount}`));
    this.updateIds();
    this.filterExpenses();
    this.calculateTotal();
  }

  getSelectedCategory(): string {
    return this.selectedCategory;
  }

  getTotal(): Observable<number> {
    this.calculateTotal();
    return this.totalSubject.asObservable();
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

  private calculateTotal(): void {
    const newTotal = this.expenses.reduce((total, exp) => {
      // this.messageService.add(`Adding total: ${total} + ${exp.amount}`);
      return total + exp.amount;}, 0);
      // this.messageService.add(`total is ${newTotal}`);
    this.totalSubject.next(newTotal);
  }

  private updateIds() {
    this.usedIds = this.expenses.map((expense) => expense.id);
  }
}

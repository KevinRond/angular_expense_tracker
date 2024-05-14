import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';
import { EXPENSECATEGORIES } from '../category';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  categories: string[] = EXPENSECATEGORIES;
  fuckedAmount: number = 0;
  expense: Expense = {id: -1, description: '', amount: 0, category: ''}

  constructor(private expenseService: ExpenseService) {}

  addExpense(): void {
    let lowestAvailableId: number | null = null;
    for (let i = 0; i < this.expenseService.getIds().length; i++) {
      if (this.expenseService.getIds()[i] !== i) {
        lowestAvailableId = i;
        break;
      }
    }
    if (lowestAvailableId === null) {
      lowestAvailableId = this.expenseService.getIds().length;
    }
    this.expense.amount = (+this.fuckedAmount);
    this.expense.id = lowestAvailableId;
    const newExpense = {...this.expense, id: lowestAvailableId, amount: this.expense.amount};

    this.expenseService.addExpense(newExpense);
  }
}

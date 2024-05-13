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
    this.expense.id = lowestAvailableId;
    const newExpense = {...this.expense, id: lowestAvailableId};

    this.expenseService.addExpense(newExpense);
  }
}

import { Component } from '@angular/core';
import { EXPENSECATEGORIES } from '../category';
import { FormControl } from '@angular/forms';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-filter',
  templateUrl: './expense-filter.component.html',
  styleUrl: './expense-filter.component.scss'
})
export class ExpenseFilterComponent {
  categories: string[] = EXPENSECATEGORIES;
  selectedCategory: string = 'All Categories';

  constructor(private expenseService: ExpenseService) {}

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.expenseService.setSelectedCategory(this.selectedCategory);
  }
}

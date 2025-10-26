import { Component, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryStoreService } from '../../services/category-store.service';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.scss'
})
export class CategoriesPage implements OnInit {
  readonly categories: Signal<Category[]>;
  readonly category: Signal<Category | null>;

  readonly addCategoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required)
  });
  readonly updateCategoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required)
  });

  constructor(private readonly categoryStoreService: CategoryStoreService) {
    this.categories = this.categoryStoreService.categories;
    this.category = this.categoryStoreService.category;
  }

  ngOnInit(): void {
    this.categoryStoreService.getCategories().subscribe();
  }

  onAddCategory(): void {
    if (this.addCategoryFormGroup.invalid) return;

    this.categoryStoreService.addCategory(this.addCategoryFormGroup.value).subscribe({
      complete: () => this.addCategoryFormGroup.reset()
    });
  }

  onGetCategory(id: string): void {
    this.categoryStoreService.getCategory(id).subscribe();
  }

  onUpdateCategory(): void {
    const category: Category | null = this.category();

    if (!category || this.updateCategoryFormGroup.invalid) return;

    this.categoryStoreService.updateCategory(category.id, this.updateCategoryFormGroup.value).subscribe({
      complete: () => this.onClearCategory()
    });
  }

  onDeleteCategory(category: Category): void {
    if (!window.confirm(`Wollen Sie die Kategorie '${category.name}' wirklich löschen?`)) return;

    this.categoryStoreService.deleteCategory(category.id).subscribe();
  }

  onClearCategory(): void {
    this.updateCategoryFormGroup.reset();
    this.categoryStoreService.clearCategory();
  }
}

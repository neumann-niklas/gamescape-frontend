import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.model';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { Category } from '../../models/category.model';
import { CategoryStoreService } from '../../services/category-store.service';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule],
  templateUrl: './categories.page.html',
  styleUrl: './categories.page.scss'
})
export class CategoriesPage implements OnInit {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly categoryStoreService: CategoryStoreService = inject<CategoryStoreService>(CategoryStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;
  readonly categories: Signal<Category[]> = this.categoryStoreService.categories;
  readonly category: Signal<Category | null> = this.categoryStoreService.category;

  readonly addCategoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required])
  });
  readonly updateCategoryFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required])
  });

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

  onClearCategory(): void {
    this.categoryStoreService.clearCategory();
    this.updateCategoryFormGroup.reset();
  }

  onUpdateCategory(id: string): void {
    if (this.updateCategoryFormGroup.invalid) return;

    this.categoryStoreService.updateCategory(id, this.updateCategoryFormGroup.value).subscribe({
      complete: () => this.updateCategoryFormGroup.reset()
    });
  }

  onDeleteCategory(id: string): void {
    this.categoryStoreService.deleteCategory(id).subscribe();
  }
}

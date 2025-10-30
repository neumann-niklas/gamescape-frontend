import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddCategory, Category, UpdateCategory } from '../models/category.model';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryStoreService {
  private readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);

  private readonly _categories: WritableSignal<Category[]> = signal<Category[]>([]);
  private readonly _category: WritableSignal<Category | null> = signal<Category | null>(null);

  readonly categories: Signal<Category[]> = computed<Category[]>(() => this._categories());
  readonly category: Signal<Category | null> = computed<Category | null>(() => this._category());

  addCategory(addCategory: AddCategory): Observable<Category> {
    return this.categoryService.addCategory(addCategory).pipe(tap({
      next: (category: Category) => this._categories.set([...this._categories(), category])
    }));
  }

  getCategories(): Observable<Category[]> {
    return this.categoryService.getCategories().pipe(tap({
      next: (categories: Category[]) => this._categories.set(categories)
    }));
  }

  getCategory(id: string): Observable<Category> {
    return this.categoryService.getCategory(id).pipe(tap({
      next: (category: Category) => this._category.set(category)
    }));
  }

  updateCategory(id: string, updateCategory: UpdateCategory): Observable<Category> {
    return this.categoryService.updateCategory(id, updateCategory).pipe(tap({
      next: (category: Category) => this._categories.set(this._categories().map((c: Category) => c.id === category.id ? category : c)),
      complete: () => this._category.set(null)
    }));
  }

  deleteCategory(id: string): Observable<Category> {
    return this.categoryService.deleteCategory(id).pipe(tap({
      next: () => this._categories.set(this._categories().filter((category: Category) => category.id !== id))
    }));
  }

  clearCategory(): void {
    this._category.set(null);
  }
}

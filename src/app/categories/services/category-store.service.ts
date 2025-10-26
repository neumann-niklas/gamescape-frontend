import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddCategory, Category, UpdateCategory } from '../models/category.model';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryStoreService {
  private readonly _categories: WritableSignal<Category[]> = signal([]);
  private readonly _category: WritableSignal<Category | null> = signal(null);

  readonly categories: Signal<Category[]> = computed(() => this._categories());
  readonly category: Signal<Category | null> = computed(() => this._category());

  constructor(private readonly categoryService: CategoryService) { }

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
      next: (category: Category) => this._categories.set(this._categories().map((c: Category) => c.id === category.id ? category : c))
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

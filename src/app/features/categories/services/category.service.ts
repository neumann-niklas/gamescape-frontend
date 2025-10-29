import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AddCategory, Category, UpdateCategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly httpClient: HttpClient = inject<HttpClient>(HttpClient);

  private readonly categoriesApiUrl: string = environment.apiUrl + 'categories';

  addCategory(addCategory: AddCategory): Observable<Category> {
    return this.httpClient.post<Category>(this.categoriesApiUrl, addCategory);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoriesApiUrl);
  }

  getCategory(id: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.categoriesApiUrl}/${id}`);
  }

  updateCategory(id: string, updateCategory: UpdateCategory): Observable<Category> {
    return this.httpClient.patch<Category>(`${this.categoriesApiUrl}/${id}`, updateCategory);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.httpClient.delete<Category>(`${this.categoriesApiUrl}/${id}`);
  }
}

import { Component, input, InputSignal } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  readonly category: InputSignal<Category> = input.required<Category>();
}

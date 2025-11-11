import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';

export type SelectOption<T = string> = { readonly label: string, readonly value: T };

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent<T = string> {
  readonly iconName: InputSignal<string | null> = input<string | null>(null);
  readonly label: InputSignal<string | null> = input<string | null>(null);
  readonly options: InputSignal<SelectOption<T>[]> = input<SelectOption<T>[]>([]);
  readonly selected: ModelSignal<SelectOption<T> | null> = model<SelectOption<T> | null>(null);

  isExpanded: boolean = false;

  onSelect(option: SelectOption<T>): void {
    this.selected.set(this.selected() === option ? null : option);
    this.isExpanded = false;
  }
}

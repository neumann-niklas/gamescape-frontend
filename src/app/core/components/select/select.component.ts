import { Component, signal, Signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  readonly iconName: Signal<string | null> = signal<string | null>('select');
  readonly label: Signal<string | null> = signal<string | null>('Label');
  readonly options: Signal<string[]> = signal<string[]>(['Foo', 'Bar', 'Baz', 'Qux']);
  readonly selected: WritableSignal<string | null> = signal<string | null>(null);

  isExpanded: boolean = false;

  onSelect(option: string): void {
    this.selected.set(this.selected() === option ? null : option);
    this.isExpanded = false;
  }
}

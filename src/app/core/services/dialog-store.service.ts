import { computed, Injectable, Signal, signal, Type, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogStoreService {
  private readonly _component: WritableSignal<Type<any> | null> = signal<Type<any> | null>(null);
  private readonly _title: WritableSignal<string> = signal<string>('');

  readonly component: Signal<Type<any> | null> = computed<Type<any> | null>(() => this._component());
  readonly title: Signal<string> = computed<string>(() => this._title());

  open<T>(component: Type<T>, title?: string): void {
    this._component.set(component);
    if (title) this._title.set(title);
  }

  close(): void {
    this._component.set(null);
    this._title.set('');
  }
}

import { computed, Injectable, Signal, signal, Type, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogStoreService {
  private readonly _component: WritableSignal<Type<any> | null> = signal<Type<any> | null>(null);

  readonly component: Signal<Type<any> | null> = computed<Type<any> | null>(this._component);

  open<T>(component: Type<T>): void {
    this._component.set(component);
  }

  close(): void {
    this._component.set(null);
  }
}

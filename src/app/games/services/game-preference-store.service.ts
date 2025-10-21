import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

export type ViewType = 'grid' | 'list';

@Injectable({
  providedIn: 'root'
})
export class GamePreferenceStoreService {
  private readonly viewTypeKey: string = 'viewType';

  private readonly _viewType: WritableSignal<ViewType> = signal('grid');

  readonly viewType: Signal<ViewType> = computed(() => this._viewType());

  constructor() {
    this.loadViewType();
  }

  private loadViewType(): void {
    this._viewType.set(localStorage.getItem(this.viewTypeKey) as ViewType ?? 'grid');
  }

  setViewType(viewType: ViewType): void {
    this._viewType.set(viewType);
    localStorage.setItem(this.viewTypeKey, viewType);
  }
}

import { Component, effect, inject, Signal, Type, viewChild, ViewContainerRef } from '@angular/core';
import { DialogStoreService } from '../../services/dialog-store.service';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);

  readonly component: Signal<Type<any> | null> = this.dialogStoreService.component;
  readonly title: Signal<string> = this.dialogStoreService.title;
  readonly content: Signal<ViewContainerRef | undefined> = viewChild<undefined, ViewContainerRef>('content', { read: ViewContainerRef });

  constructor() {
    effect(() => {
      const content: ViewContainerRef | undefined = this.content();
      const component: Type<any> | null = this.dialogStoreService.component();

      if (!content || !component) return;

      content.clear();
      content.createComponent(component);
    });
  }

  onClose(): void {
    this.dialogStoreService.close();
  }
}

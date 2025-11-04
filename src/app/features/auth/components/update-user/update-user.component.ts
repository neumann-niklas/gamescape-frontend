import { Component, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUser, User } from '../../../../core/models/user.model';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);

  readonly user: Signal<User | null> = this.authStoreService.user;

  readonly updateUserFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>('')
  });

  get updateUser(): UpdateUser {
    const updateUser: any = {};
    const user: User | null = this.user();

    if (!user) return updateUser;

    for (const [key, value] of Object.entries<UpdateUser>(this.clearValues(this.updateUserFormGroup.value)))
      if (user[key as keyof User] !== value) updateUser[key] = value;

    return updateUser;
  }

  get isUpdateUserValid(): boolean {
    return Object.keys(this.updateUser).length > 0;
  }

  onUpdateUser(): void {
    if (!this.isUpdateUserValid) return;

    const user: User | null = this.user();

    if (!user) return;

    this.authStoreService.updateUser(this.updateUser).subscribe({
      complete: () => this.dialogStoreService.close()
    });
  }

  private clearValues(values: any): any {
    return Object.fromEntries(Object.entries(values).filter(([_, value]) => value !== null && value !== ''));
  }
}

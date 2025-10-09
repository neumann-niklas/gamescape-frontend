import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUser, User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-update-user.page',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.page.html',
  styleUrl: './update-user.page.scss'
})
export class UpdateUserPage {
  readonly user: Signal<User | null>;
  readonly updateUserFormGroup: FormGroup;

  constructor(private readonly authStoreService: AuthStoreService) {
    this.user = this.authStoreService.user;
    this.updateUserFormGroup = new FormGroup({
      firstName: new FormControl<string>(this.user()?.firstName ?? ''),
      lastName: new FormControl<string>(this.user()?.lastName ?? '')
    });
  }

  get updateUser(): UpdateUser {
    return Object.fromEntries(Object.entries(this.updateUserFormGroup.value)
      .filter(([key, value]) => value !== '' && value !== (this.user() as any)[key]));
  }

  get isUpdateUserValid(): boolean {
    return Object.keys(this.updateUser).length > 0;
  }

  onUpdateUser(): void {
    this.authStoreService.updateUser(this.updateUser);
  }

  onResetForm(): void {
    this.updateUserFormGroup.setValue({
      firstName: this.user()?.firstName ?? '',
      lastName: this.user()?.lastName ?? ''
    });
  }
}

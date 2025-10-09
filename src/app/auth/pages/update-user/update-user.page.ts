import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUser, User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-update-user.page',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.page.html',
  styleUrl: './update-user.page.scss'
})
export class UpdateUserPage {
  readonly updateUserFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl<string | null>(null),
    lastName: new FormControl<string | null>(null)
  });
  readonly user: Signal<User | null>;

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService
  ) {
    this.user = this.authStoreService.user;
  }

  get updateUser(): UpdateUser {
    return Object.fromEntries(Object.entries(this.updateUserFormGroup.value).filter(([_, value]) => value !== null));
  }

  get isUpdateUserValid(): boolean {
    return Object.keys(this.updateUser).length > 0;
  }

  onUpdateUser(): void {
    this.authStoreService.updateUser(this.updateUser).subscribe({
      complete: () => this.router.navigate(['/user'])
    });
  }
}

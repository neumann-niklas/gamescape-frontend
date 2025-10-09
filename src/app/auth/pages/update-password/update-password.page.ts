import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-update-password.page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './update-password.page.html',
  styleUrl: './update-password.page.scss'
})
export class UpdatePasswordPage {
  readonly updatePasswordFormGroup: FormGroup = new FormGroup({
    password: new FormControl<string | null>(null, [Validators.required])
  });
  readonly user: Signal<User | null>;
  showPassword: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService
  ) {
    this.user = this.authStoreService.user;
  }

  onUpdatePassword(): void {
    if (this.updatePasswordFormGroup.invalid) return;

    this.authStoreService.updatePassword(this.updatePasswordFormGroup.value).subscribe({
      complete: () => this.router.navigate(['/user'])
    });
  }
}

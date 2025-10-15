import { Component, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-update-email',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './update-email.page.html',
  styleUrl: './update-email.page.scss'
})
export class UpdateEmailPage {
  readonly updateEmailFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email])
  });
  readonly user: Signal<User | null>;

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService
  ) {
    this.user = this.authStoreService.user;
  }

  onUpdateEmail(): void {
    if (this.updateEmailFormGroup.invalid) return;

    this.authStoreService.updateEmail(this.updateEmailFormGroup.value).subscribe({
      complete: () => this.router.navigate(['/user'])
    });
  }
}

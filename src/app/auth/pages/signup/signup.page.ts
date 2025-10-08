import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss'
})
export class SignupPage {
  readonly signupFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService
  ) {
    effect(() => {
      if (authStoreService.isAuthenticated()) this.router.navigate(['/']);
    });
  }

  signUp(): void {
    if (this.signupFormGroup.invalid) return;

    this.authStoreService.signUp(this.signupFormGroup.value);
  }
}

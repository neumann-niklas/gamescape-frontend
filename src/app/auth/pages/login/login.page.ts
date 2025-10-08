import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  readonly loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private readonly router: Router,
    private readonly authStoreService: AuthStoreService
  ) {
    effect(() => {
      if (this.authStoreService.isAuthenticated()) this.router.navigate(['/']);
    });
  }

  logIn(): void {
    if (this.loginFormGroup.invalid) return;

    this.authStoreService.logIn(this.loginFormGroup.value);
  }
}

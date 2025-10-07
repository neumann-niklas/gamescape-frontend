import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  readonly loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private readonly authService: AuthService) { }

  logIn(): void {
    if (this.loginFormGroup.invalid) return;

    this.authService.logIn(this.loginFormGroup.value).subscribe({
      next: ({ accessToken }: { readonly accessToken: string }) => console.log(accessToken)
    });
  }
}

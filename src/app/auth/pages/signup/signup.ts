import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup {
  readonly signupFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private readonly authService: AuthService) { }

  signUp(): void {
    if (this.signupFormGroup.invalid) return;

    this.authService.signUp(this.signupFormGroup.value).subscribe({
      next: ({ accessToken }: { readonly accessToken: string }) => console.log(accessToken)
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);

  readonly signupFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  showPassword: boolean = false;

  onSignUp(): void {
    if (!this.signupFormGroup.valid) return;

    this.authStoreService.signUp(this.signupFormGroup.value).subscribe({
      complete: () => this.dialogStoreService.close()
    });
  }
}

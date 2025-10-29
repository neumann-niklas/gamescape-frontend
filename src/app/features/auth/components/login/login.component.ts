import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStoreService } from '../../../../core/services/auth-store.service';
import { DialogStoreService } from '../../../../core/services/dialog-store.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authStoreService: AuthStoreService = inject<AuthStoreService>(AuthStoreService);
  private readonly dialogStoreService: DialogStoreService = inject<DialogStoreService>(DialogStoreService);

  readonly loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });

  showPassword: boolean = false;

  onLogIn(): void {
    if (this.loginFormGroup.invalid) return;

    this.authStoreService.logIn(this.loginFormGroup.value).subscribe({
      complete: () => this.dialogStoreService.close()
    });
  }
}

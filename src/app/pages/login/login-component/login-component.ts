import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),

    rememberMe: new FormControl(false, {
      nonNullable: true,
    }),
  });

  passwordVisible = false;
  isSigningIn = false;
  errorMessage = '';

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid || this.isSigningIn) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    this.isSigningIn = true;

    this.authService
      .login({
        username: username.trim(),
        password: password,
      })
      .subscribe({
        next: (response) => {
          console.log('Login success:', response);
          this.authService.currentUser.set(response.payload?.user ?? null);

          this.isSigningIn = false;

          this.router.navigate(['/']);
        },

        error: (error) => {
          console.error('Login error:', error);
          console.error('Status:', error.status);
          console.error('URL:', error.url);
          console.error('Error body:', error.error);

          this.errorMessage =
            error?.error?.message ??
            'Unable to sign in. Please check your credentials and try again.';

          this.isSigningIn = false;
        },
      });
  }
}

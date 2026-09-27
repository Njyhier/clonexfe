import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';

const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordsMismatch: true };
};

@Component({
  selector: 'app-signup-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  signupForm = new FormGroup(
    {
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),

      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),

      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: passwordsMatchValidator,
    },
  );

  passwordVisible = false;
  confirmPasswordVisible = false;

  isSigningUp = false;
  errorMessage = '';
  successMessage = '';

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPassword(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  signup(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.signupForm.getRawValue();

    // Only send fields the backend expects.
    const signupData = {
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    this.isSigningUp = true;

    this.authService.signup(signupData).subscribe({
      next: (response) => {
        this.isSigningUp = false;

        this.successMessage = response.message;

        console.log('Signup successful:', response.payload);

        // Send the user to login after successful registration
        this.router.navigate(['/login']);
      },

      error: (error) => {
        this.isSigningUp = false;

        console.error('Signup error:', error);

        this.errorMessage =
          error?.error?.message ?? 'Unable to create your account. Please try again.';
      },
    });
  }
}

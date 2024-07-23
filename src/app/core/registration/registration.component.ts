import { UserManagementService } from './../../shared/services/user-management/user-management.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatLabel, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  formBuilder = inject(FormBuilder);
  UserManagementService = inject(UserManagementService);
  router = inject(Router);
  loading = false;
  submitted = false;
  passwordsMatch : boolean = false
  constructor() { }

  registerForm = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    },confirmPasswordValidator );

  isSubmitDisabled = this.registerForm.valid && this.passwordsMatch

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.UserManagementService.register(this.registerForm.getRawValue()).subscribe(
      data => {
        this.router.navigate(['/login']);
      });
  }
}

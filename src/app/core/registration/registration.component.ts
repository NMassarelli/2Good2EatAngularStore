import { UserManagementService } from './../../shared/services/user-management/user-management.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  formBuilder = inject(FormBuilder);
  UserManagementService = inject(UserManagementService);
  router = inject(Router);

  loading = false;
  submitted = false;
  constructor() { }

  registerForm = new FormGroup({
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });

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

import { Component, ErrorHandler, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatLabel, MatInputModule, ReactiveFormsModule, FormsModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });
  submitted!: boolean;
  loading!: boolean;
  authenticationService = inject(AuthenticationService);
  errorHandler = inject(ErrorHandler);
  router = inject(Router);
  returnUrl = inject(ActivatedRoute).snapshot.queryParams['returnUrl'] || '/';

  ngOnInit(): void {

    this.authenticationService.logout();
    // get return url from route parameters or default to '/'

  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.getRawValue(), this.returnUrl);
  }
}

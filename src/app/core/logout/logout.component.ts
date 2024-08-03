import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  constructor() { }

  ngOnInit() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}

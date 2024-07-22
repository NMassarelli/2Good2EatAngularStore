import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'header-bar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, NgOptimizedImage],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
 private authService = inject(AuthenticationService);
 isLoggedIn$ = this.authService.isAuth;





}

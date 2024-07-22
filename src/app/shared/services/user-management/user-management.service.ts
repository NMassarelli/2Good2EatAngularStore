import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';
import { RegistrationRequest } from '../../models/login.model';

type AuthState = {
  user: User | null;
  token: string | null;
  is_auth: boolean;
  loading: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  registerPath = 'User/Register'
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService) { }

  register(request: RegistrationRequest): Observable<boolean> {
    return this.http.post<boolean>(this.registerPath, request)
      .pipe(
        tap(_ => this.errorHandler.log('register User', 'UserManagementService')),
        catchError(this.errorHandler.handleError<boolean>('UserManagementService', false))
      );
  }

}

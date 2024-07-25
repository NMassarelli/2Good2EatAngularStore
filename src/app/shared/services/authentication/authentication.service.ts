import { jwtDecode } from 'jwt-decode';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login.model';
import { ErrorHandlerService } from '../../errorHandler/error-handler.service';
import { BrowserStorageService } from '../browser-service/browser-storage.service';


type AuthState = {
  user: User | null;
  token: string | null;
  is_auth: boolean;
  loading: boolean;
  roleValue : number;
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private _accessTokenKey = "2Good2Toke";
  private browserStorage = inject(BrowserStorageService);
  private _storedToken = this.browserStorage.get(this._accessTokenKey);
  private router = inject(Router);
  private loginUrl = "api/Authentication/ProcessLogin";
  private _state = signal<AuthState>({
    user: null,
    token: this._storedToken,
    is_auth: this._storedToken !== null, // You may check the token validity here
    roleValue: 0,
    loading: false,
  });

  token = computed(() => this._state().token);
  loading = computed(() => this._state().loading);
  isAuth = computed(() => this._state().is_auth);
  user = computed(() => this._state().user);

  constructor( private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {
    effect(() => {
      const token = this.token();
      if (token !== null) {
        this.browserStorage.set(this._accessTokenKey, token);
      } else {
        this.browserStorage.remove(this._accessTokenKey);
      }
    });
  }

  imagekitAuthenticator = async () => {
    try {
      const response = await fetch(environment.apiUrl + '/GenerateKeyForImagekit', { method: "POST" });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error}`);
    }
  };

  login(payload: LoginRequest, returnUrl: string): void {
    decodedToken:
    this.http
      .post<string>(this.loginUrl, payload)
      .subscribe({
        next: (res) => {
        this.browserStorage.set(this._accessTokenKey, res);
          let parsed = jwtDecode(res);

          this._state.update((state) => {
            state.user = parsed[];
            state.token = res;
            state.loading = false;
            state.roleValue =
            return state;
          });
          this.router.navigate([returnUrl]);
        },
        error: (err) => {
          this.errorHandlerService.handleError(err);
        },
      });


  }

  logout() {
    this._state.update((state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      return state;
    });
  }
}

import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';


type AuthState = {
  user: User | null;
  token: string | null;
  is_auth: boolean;
  loading: boolean;
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private _accessTokenKey = "accessToken";
  private _storedToken = localStorage.getItem(this._accessTokenKey);
  private _state = signal<AuthState>({
    user: null,
    token: this._storedToken,
    is_auth: this._storedToken !== null, // You may check the token validity here
    loading: false,
});
token = computed(() => this._state().token);
loading = computed(() => this._state().loading);
isAuth = computed(() => this._state().is_auth);
user = computed(() => this._state().user);
constructor(){}

  imagekitAuthenticator = async () => {
    try {
      const response = await fetch(environment.apiUrl + '/GenerateKeyForImagekit',{method: "POST"});

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


  logOn(){

  }






}

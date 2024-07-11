import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
constructor(){}


  authenticator = async () => {
    try {
      // You can pass headers as well and later validate the request source in the backend, or you can use headers for any other use case.
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
}

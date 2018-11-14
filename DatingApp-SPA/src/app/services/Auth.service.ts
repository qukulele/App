import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  // klasa służy do dekodowania danych w tokenie
  jwtHelper = new JwtHelperService;
  decodeToken: any;

constructor(private http: HttpClient) { }

login (model: any) {
// przesyłanie post adresu controlera oraz metody logowania wraz z danymi z formularza
// w modelu jest MAP <K,V> kluczem jest informacja że to jest token jako value przesyłany jest token
  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        this.decodeToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodeToken);
      }
    })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn () {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl ='http://loclahost:5000/api/auth/';

constructor(private http:HttpClient) { }

}

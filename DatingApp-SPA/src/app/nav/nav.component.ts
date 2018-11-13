import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // w modelu jest to co przychodzi z formularza logowania
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log(error);
    });
  }

  loggedIn() {
    // do stałej token pobieramy z pamięci podręcznej token uzytkownika
    const token = localStorage.getItem('token');
    // zwraca true or false
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}

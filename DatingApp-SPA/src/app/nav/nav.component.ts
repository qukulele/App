import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { AlertyfiService } from '../services/alertyfi.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // w modelu jest to co przychodzi z formularza logowania
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertyfiService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logowanie udane');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    // do stałej token pobieramy z pamięci podręcznej token uzytkownika
    // const token = localStorage.getItem('token');
    // zwraca true or false
    // return !!token;

    // to jest nowa wersja używająca jwt
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('Wylogowano');
  }
}

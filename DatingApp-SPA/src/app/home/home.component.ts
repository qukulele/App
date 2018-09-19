import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  // values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getValues();
  }

  registerToggle() {
    // słuzy do zmiany zmiennej określającej czy ma być widoczny formularz rejestracji użytkownika
    this.registerMode = ! this.registerMode; // == ture
  }

  // getValues () {
    // pobieramy value z bazy i przypisujemy do zmiennej values którą poźniej przekazujemy do child component jako [valuesFromHome]=values
  //   this.http.get('http://localhost:5000/api/values').subscribe(response => {
  //     this.values = response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}

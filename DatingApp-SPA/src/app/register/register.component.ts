import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/Auth.service';
import { AlertyfiService } from '../services/alertyfi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // input jest potrzebny do odbierania danych przekazanych przez parent component
  // zmienna musi nazywać się tak samo jak zmienna przekazana przez parent component
  // @Input() valuesFromHome: any;
  // do przekazywania danych z child component do parent component słuzy Output
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertyfiService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe (() => {
      this.alertify.success('register successful');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    // tą metodą przekazujemy dane do parent component, możemy rózne rzeczy przekazać, obiekt, zmienna itp
    this.cancelRegister.emit(false);
  }

}

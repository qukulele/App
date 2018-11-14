import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { AlertyfiService } from '../services/alertyfi.service';


@Injectable({
  providedIn: 'root'
})
export class AutchGuard implements CanActivate {
  constructor (private authService: AuthService, private route: Router, private alertify: AlertyfiService) {}

  canActivate(): boolean {
    // sprawdza czy jesteśmy zalogowani i czy możemy otworzyć stronę
    if (this.authService.loggedIn()) {
      return true;
    }
   this.alertify.error('You shall no pass!!');
   this.route.navigate(['/home']);
   return false;
  }
}

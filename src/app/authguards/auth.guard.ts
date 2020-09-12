import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private alertify: AlertifyService,
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alertify.error('You need to register to access the application');
    this.router.navigate(['/home']);
  }
}

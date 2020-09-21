import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "src/app/models/user";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private auth: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<User> | Promise<User> {
    return this.userService.getUser(this.auth.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error(
          "There was an error in resolving user!. Please call helpdesk"
        );
        this.router.navigate["/members"];
        return of(null);
      })
    );
  }
}

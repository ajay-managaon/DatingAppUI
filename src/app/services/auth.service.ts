import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:51446/Auth/';
  constructor(private _http: HttpClient) { }
  
  login(model: any) {
    return this._http.post(this.url + 'login', model)
      .pipe(
        map((response: any)=> {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token)
          }
      })
    )
  }

  register(model: any) {
    return this._http.post(this.url + 'register', model);
  }
}

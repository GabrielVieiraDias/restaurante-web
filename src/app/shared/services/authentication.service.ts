import { LoginRequest } from '../models/login-request.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const TOKEN_NAME = 'access_token';
export const NAME_USER_LOGGED = 'name_user_logged';
export const USER_LOGGED = 'user_logged';
export const DATE_EXPIRE = 'date_expire';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends GenericService {

  constructor(private http: HttpClient,
    private router: Router,
    private translate: TranslateService) {
    super();
  }

  login(login: LoginRequest): Observable<LoginRequest> {
    const data = {
      'email': login.email,
      'password': login.password
    };

    return this.http.post<LoginRequest>(this.getUrlApi() + this.getEndpointLogin(),
      data, { headers: this.getHeaders() });
  }

  logout(url?: string) {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(NAME_USER_LOGGED);
    localStorage.removeItem(USER_LOGGED);
    localStorage.removeItem(DATE_EXPIRE);

    this.translate.get('routes.login').subscribe((result: string) => {
      if (url) {
        this.router.navigate([result], { queryParams: { returnUrl: url } });
      } else {
        this.router.navigate([result]);
      }
    });
  }

  decodedToken(token: string) {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null;
    }

    if (decoded.role instanceof Array) {
      decoded.role.forEach(element => {
        this.setRole(element);
      });
    } else {
      this.setRole(decoded.role);
    }

    this.setUserLogged(decoded.unique_name);
    this.setNameUserLogged(decoded.sub.split(' ')[0]);

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    this.setDateExpire(date);

    return decoded;
  }

  isAuthenticated(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return false;
    }

    const date = this.getDateExpire();
    if (date === undefined) {
      return false;
    }

    const result = (date.valueOf() > new Date().valueOf());
    return result;
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    this.decodedToken(token);
  }

  getUserLogged() {
    return localStorage.getItem(USER_LOGGED);
  }
  setUserLogged(userLogged: string) {
    localStorage.setItem(USER_LOGGED, userLogged);
  }

  getNameUserLogged() {
    return localStorage.getItem(NAME_USER_LOGGED);
  }
  setNameUserLogged(nameUserLogged: string) {
    localStorage.setItem(NAME_USER_LOGGED, nameUserLogged);
  }

  getDateExpire() {
    return new Date(localStorage.getItem(DATE_EXPIRE));
  }
  setDateExpire(date: Date) {
    localStorage.setItem(DATE_EXPIRE, date.toString());
  }

  setRole(role: string) {
    return localStorage.setItem(role, 'true');
  }
}

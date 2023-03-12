import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signin } from '../interfaces/signin';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private jwthelper: JwtHelperService) {}

  login(user: signin): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      this.baseURL + '/login',
      user
    );
  }
  register(user: signin): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      this.baseURL + '/register',
      user
    );
  }
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('accessToken');
    if (!authToken || this.jwthelper.isTokenExpired(authToken)) return false;
    return true;
  }
}

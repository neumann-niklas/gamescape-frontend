import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login.model';
import { Signup } from '../pages/signup/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authApiUrl: string = environment.apiUrl + '/auth';

  constructor(private readonly httpClient: HttpClient) { }

  signUp(signup: Signup): Observable<{ readonly accessToken: string }> {
    return this.httpClient.post<{ readonly accessToken: string }>(this.authApiUrl + '/signup', signup);
  }

  logIn(login: Login): Observable<{ readonly accessToken: string }> {
    return this.httpClient.post<{ readonly accessToken: string }>(this.authApiUrl + '/login', login);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login.model';
import { Signup } from '../models/signup.model';
import { UpdateUser, User } from '../models/user.model';

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

  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.authApiUrl);
  }

  updateUser(updateUser: UpdateUser): Observable<User> {
    return this.httpClient.patch<User>(this.authApiUrl, updateUser);
  }

  updateEmail(email: string): Observable<User> {
    return this.httpClient.patch<User>(this.authApiUrl + '/email', email);
  }

  updatePassword(password: string): Observable<User> {
    return this.httpClient.patch<User>(this.authApiUrl + '/password', password);
  }

  deleteUser(): Observable<User> {
    return this.httpClient.delete<User>(this.authApiUrl);
  }
}

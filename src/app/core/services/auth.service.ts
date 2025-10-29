import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth, Login, Signup } from '../models/auth.model';
import { UpdateUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient: HttpClient = inject<HttpClient>(HttpClient);

  private readonly authApiUrl: string = environment.apiUrl + '/auth';

  signUp(signup: Signup): Observable<Auth> {
    return this.httpClient.post<Auth>(this.authApiUrl + '/signup', signup);
  }

  logIn(login: Login): Observable<Auth> {
    return this.httpClient.post<Auth>(this.authApiUrl + '/login', login);
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

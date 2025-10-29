import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ACCESS_TOKEN_KEY } from '../services/auth-store.service';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!accessToken) return next(request);

  return next(request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + accessToken) }));
};

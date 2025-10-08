import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next) => {
  const accessToken: string | null = localStorage.getItem('accessToken');

  if (!accessToken) return next(request);

  return next(request.clone({
    headers: request.headers.set('Authorization', 'Bearer ' + accessToken)
  }));
};

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export function appendToken(req: HttpRequest<any>, token: string) {
  return req.clone({
      headers: req.headers.set('x-bitlo-auth', `${token}`)
  });
}

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const updatedReq = token ? appendToken(req, token) : req;
    return next.handle(updatedReq);
  }
}

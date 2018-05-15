import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
  next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem("token");
    if (token) {
      const cloned = req.clone({
          headers: req.headers.set("authorization",token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }

}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  
  constructor(private storageService: StorageService,private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  
    try {

      let costumHeader = req.headers.get('Authorization');
      if (!costumHeader) {
        if (localStorage.getItem("access_token")) {
          const token = localStorage.getItem("access_token");
          req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
        }
      } else if (costumHeader === 'none') {
        req = req.clone({headers: req.headers.delete('Authorization')});
      } else {
        req = req.clone({headers: req.headers});
      }
      return next.handle(req);
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
}

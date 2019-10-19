import { AuthenticationService } from './../shared/services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }

        if (this.auth.isAuthenticated()) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) { }
                },
                    error => {
                        if (error.status === 401) {
                            this.auth.logout();
                        }
                        if (error.status === 403) {
                            this.router.navigate(['/pageNotFound']);
                        }
                    }
                ));
        } else {
            this.auth.logout();
            return next.handle(req);
        }
    }
}

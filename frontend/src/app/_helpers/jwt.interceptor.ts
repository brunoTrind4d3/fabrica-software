import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../_services";
//const TOKEN_HEADER_KEY = "";
const TOKEN_HEADER_KEY = "x-access-token";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
    console.log("interceptor");
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log("interceptor");
    let authReq = request;
    let token = localStorage.getItem("token");
    authReq = request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, "Bearer " + token),
      withCredentials: true,
    });

    return next.handle(authReq);
  }
}

export const jwt = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];

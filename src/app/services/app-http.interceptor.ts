import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppStateService} from "./app-state.service";
import {finalize} from "rxjs/operators";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appState: AppStateService,
              private loadingService:LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // exemple il faut tt d'abord le declarer dans app module
    /*let req=request.clone({
      headers:request.headers.set("Authorization","Bearer JWT")
    });*/
    // sol 1
    /*this.appState.setProductState({
      status: "LOADING"
    });*/
    // sol 2
      this.loadingService.showLoadingSpinner();

    let req = request.clone({
      headers: request.headers.set("Authorization", "Bearer JWT")
    });


    return next.handle(req).pipe(
      finalize(() => {
        // sol 1
        /*this.appState.setProductState({
          status: "LOADED"
        })*/
        // sol 2
        this.loadingService.hideLoadingSpinner();
      })
    );

  }
}

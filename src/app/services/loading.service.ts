import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
public isLoading$=new Subject<boolean>() // le $ c'est une convention pour une variable observable
  constructor() { }
  showLoadingSpinner(){
     this.isLoading$.next(true);
  }
  hideLoadingSpinner():void{
    this.isLoading$.next(false);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
   public productState:any={
     keyWord:"",
     totalPages:0,
     pageSize:3,
      currentPage:1,
     totalProducts:0,
      products: [],
     status:"",
     errorMessage:""
   };
   public authState:any={
     username:undefined,
     roles:undefined,
     isAuthenticated:false,
     token:undefined

   }
  constructor() { }
  public setProductState(state:any):void{
     this.productState={...this.productState,...state};
  }

  public setAuthState(state:any):void{
    this.authState={...this.authState,...state};
  }

}

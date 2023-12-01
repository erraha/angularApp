import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:5555/products");
  }
  // récuppérer que les données
  /*public getProducts0(page:number=1,size:number=4):Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:5555/products?_page="+page+"&_limit="+size);
  }*/

  // recuperer l'objet httpResponse
  /*public getProducts0(page:number=1,size:number=4){
    return this.http.get("http://localhost:5555/products?_page="+page+"&_limit="+size,{observe:'response'});
  }*/
// compatible avec recherche
  public getProducts1(keyWord: string="",page:number=1,size:number=4){
    return this.http.get("http://localhost:5555/products?name_like="+keyWord+
                        "&_page="+page+"&_limit="+size,{observe:'response'});
  }

  public checkProduct(product:Product):Observable<Product>{
   return  this.http.patch<Product>("http://localhost:5555/products/"+product.id,{
      checked:!product.checked
    });
  }

  public deleteProduct(product:Product){
     return this.http.delete<any>("http://localhost:5555/products/"+product.id);
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>("http://localhost:5555/products/",product);
  }
// solution 1
  public searchProduct(keyWord:string):Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:5555/products?name_like="+keyWord);
  }


  getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>("http://localhost:5555/products/"+productId);
  }

  updateProduct(product: Product) :Observable<Product>{
    return this.http.put<Product>("http://localhost:5555/products/"+product.id,product);
  }
}

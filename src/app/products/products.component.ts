import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {ProductService} from "../services/product.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service"
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {



  /*products:Array<any>=[
    {id:1,name:"Computer",price:5600,checked:false},
    {id:2,name:"Printer",price:1600,checked:true},
    {id:3,name:"Phone",price:3600,checked:false},
  ]*/
  //1 -solution
  /*products: Array<any> = []*/
// 2-solution
  products: Array<Product> = []
  // 3-sol
  //products$!:Observable<Array<Product>>;

  /*private http:HttpClient;
  constructor( http:HttpClient) {
      this.http=http;
   }
   ou*/
  constructor(private http: HttpClient, private service: ProductService,
               private routre:Router,public appState:AppStateService) {
  }

  ngOnInit(): void {
    /*this.products=[{id:1,name:"Computer",price:5600,checked:false},
      {id:2,name:"Printer",price:1600,checked:true},
      {id:3,name:"Phone",price:3600,checked:false},]*/
    // solution 0
    /*this.http.get<Array<any>>("http://localhost:5555/products")
      .subscribe({
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err)
        }
      });*/
    // solution 1
    this.getProducts();
  }

  getProducts() {
    // sol 1
    /*this.http.get<Array<any>>("http://localhost:5555/products")
      .subscribe({
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err)
        }
      });*/
    // sol 2
   // this.service.getProducts0(1,3)
        //this.appState.productState.status="LOADING..."
    // c est fait dans l interceptor http
    /*this.appState.setProductState({
      status:"LOADING"
    })*/
    this.service.getProducts1(this.appState.productState.keyWord,
    this.appState.productState.currentPage,
    this.appState.productState.pageSize)
      .subscribe({
        next: (resp) => {
         let products = resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);  // http://localhost:5555/products?_limit=3 avec outils de developpemen
          let totalPages=Math.floor(totalProducts/this.appState.productState.pageSize);
          if(totalProducts % this.appState.productState.pageSize !=0 ) totalPages++;
          this.appState.setProductState({
            products:products,
            totalPages:totalPages,
            totalProducts:totalProducts,
            status:"LOADED"
          })
        },
        error: err => {
          //console.log(err)
          this.appState.setProductState({
            status:"ERROR",
            errorMessage:err
          })
        }
      });
    // sol 3
    //this.products$=this.service.getProducts();
  }


  handleCheckProduct(product: Product) {
    // sol 1  product:any
    /*this.http.patch("http://localhost:5555/products/"+product.id,{
      checked:!product.checked
    }).subscribe( updateProduct=>{
      product.checked = !product.checked;
      //this.getProducts();
    })*/
    // sol 2
    this.service.checkProduct(product).subscribe(updateProduct => {
      product.checked = !product.checked;
      //this.getProducts();
    })

    //product.checked = !product.checked;
  }

  handleDeleteProduct(product: Product) {
    if (confirm("Etes vous Sure?"))
      this.service.deleteProduct(product)
        .subscribe(value => {
          // this.getProducts();   ca marche mais on doit tjs envoyer une requete au serveur
          this.appState.productState.products =
             this.appState.productState.products.filter((p:any) => p.id != product.id); // suppression on local
        })
  }

  searchProduct() {
    // 1 sol
   /* this.service.searchProduct(this.keyWord).subscribe(
      {
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      }
    );*/
   // sol 2
    /*this.currentPage=1;
    this.totalPages=0;
    this.service.searchProduct(this.keyWord).subscribe(
      {
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      }
    );*/
    // 3 sol
    this.getProducts();
  }


  handleGoToPage(page: number) {
    this.appState.productState.currentPage=page;
    this.getProducts();
  }

  handleEditProduct(product: Product) {
    this.routre.navigateByUrl("/admin/editProduct/"+product.id);
  }
}

import { Component, OnInit } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(public appState:AppStateService) { }

  ngOnInit(): void {
  }

  totalCheckedProduct() {
    let productChecked=this.appState.productState.products.filter((p:any)=>p.checked==true);
    return productChecked.length
  }
}

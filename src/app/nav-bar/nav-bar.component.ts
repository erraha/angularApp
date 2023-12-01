import { Component, OnInit } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  actions:Array<any>=[
    {title:"Home",route:"/home", icon:"house"},
    {title:"Produts",route:"/admin/products", icon:"arrow-down-up"},
    {title:"New Product",route:"/admin/newProduct", icon:"plus-circle"},
  ];
  currentAction:any=this.actions[0];

  setCurrentAction(action: any) {
    this.currentAction=action;
  }
  constructor(public appState:AppStateService,
              public loadingService:LoadingService,
              private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.appState.authState={}
    this.router.navigateByUrl("/login")
  }

  login() {
    this.router.navigateByUrl("/login")
  }
}

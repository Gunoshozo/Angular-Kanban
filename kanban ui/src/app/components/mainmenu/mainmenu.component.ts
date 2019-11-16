import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { 
    // if(this.loginService.currentUserValue == null) 
    //             this.router.navigate(['/login'])
  }

  ngOnInit() {
  }

  toBrowser(){
    this.router.navigate(['/browser'])
  }
  toCreate(){
    this.router.navigate(['/lobby'])
  }
}

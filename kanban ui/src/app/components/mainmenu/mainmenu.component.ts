import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService';
import { ApiService } from 'src/app/service/ApiService';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  username:string

  constructor(private apiService:ApiService, private loginService:LoginService,private router:Router) { 
    if(this.loginService.currentUserValue == null) 
                this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.username = localStorage.getItem('currentUser')
  }

  onSubmit(){
    this.apiService.createTable()
    .subscribe( data=>{
      console.log(data)
      localStorage.setItem('tableId',data['id_table'])
      this.router.navigate(['/game'])
    },
    error =>{
        console.error(error)
    })
  }

  logout(){
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
}

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
  haveTable:boolean;
  disabled = true

  constructor(private apiService:ApiService, private loginService:LoginService,private router:Router) { 
    // if(this.loginService.currentUserValue == null) 
    //             this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.username = localStorage.getItem('currentUser')
    console.log(this.username)
    this.apiService.getTableId()
    .subscribe(data=>{
      console.log(data)
      if(data['id_table']!="0"){
        localStorage.setItem('tableId',data['id_table'])
        this.haveTable = true;
        this.disabled = false;
      }else{
        this.haveTable = false;
        this.disabled = false;
      }
    },error=>{
      console.error(error)
    }
    )
    
  }

  Create(){
    this.apiService.createTable()
    .subscribe( data=>{
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

  toGame(){
    this.router.navigate(['/game'])
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/ApiService';
import { GameTable } from 'src/app/models/gametable';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService';

@Component({
  selector: 'app-gamebrowser',
  templateUrl: './gamebrowser.component.html',
  styleUrls: ['./gamebrowser.component.css']
})
export class GamebrowserComponent implements OnInit {

  constructor(private loginService:LoginService,private apiService:ApiService,private router:Router) {
      if(this.loginService.currentUserValue == null) 
                this.router.navigate(['/login'])
   }

  tables: GameTable[] = [];


  ngOnInit() {
    this.update()
  }

  toMain(){
    this.router.navigate(['/mainmenu'])
  }
  update(){
    this.apiService.getTables()
    .subscribe( data=>{
      this.tables = data['tables']
    },error=>{
        console.error(error)
    })  
  }

  join(table_index:number){
    this.apiService.join(this.tables[table_index].tableId)
    .subscribe(data =>{
      this.router.navigate(['/game'])
    },error =>{
      console.error(error)
      this.update()
    })
    
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/loginService';
import { ApiService } from 'src/app/service/ApiService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  lobbyForm:FormGroup;
  username:string

  constructor(private apiService:ApiService, private loginService:LoginService,private router:Router,private formBuilder:FormBuilder) { 
    // if(this.loginService.currentUserValue == null) 
    //             this.router.navigate(['/login'])
  }

  ngOnInit() {
    this.username = localStorage.getItem('currentUser')
    this.lobbyForm = this.formBuilder.group({
      lobbyName:['',Validators.required],
      maxPlayers: ['',Validators.required]
  })
  }

  toBrowser(){
    this.router.navigate(['/browser'])
  }
  toCreate(){
    this.router.navigate(['/game'])
  }

  onSubmit(){
    if(this.lobbyForm.invalid) return
    this.apiService.createTable(this.lobbyForm.controls.lobbyName.value,this.lobbyForm.controls.maxPlayers.value)
    .subscribe( data=>{
      //localStorage.setItem('tableId',data['tableId'])
      this.router.navigate(['/game'])
    },
    error =>{
        console.error('error')
    })
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, RegisterService } from 'src/app/service';

@Component({
    selector:'lobby',
    templateUrl:'./lobby.component.html',
    styleUrls:['./lobby.component.css']
})

export class LobbyComponent implements OnInit{
    lobbyForm: FormGroup

    constructor(
        private formBuiler:FormBuilder,
        private router:Router,
        private loginService: LoginService
    ){
    }

    ngOnInit() {
        this.lobbyForm = this.formBuiler.group({
            lobbyName: ['', Validators.required],
            maxPlayers:[2, Validators.required],
            
        });
    }

    onSubmit() {

      console.log('bump')
      this.router.navigate(['/game'])
    }
    
}
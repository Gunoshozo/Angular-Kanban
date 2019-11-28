import { Component, OnInit } from "@angular/core";
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl:'login.component.html',
    styleUrls:['login.component.css']
})

export class login implements OnInit{
    loginForm: FormGroup
    returnUrl: string

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService
        ){
           if(this.loginService.currentUserValue) 
                this.router.navigate(['/mainmenu'])
        }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email:['',Validators.required],
            password: ['',Validators.required]
        })
    }
    
    onSubmit(){
        if(this.loginForm.invalid)
        {
            return;
        }
        this.loginService.login(
            this.loginForm.controls.email.value,
            this.loginForm.controls.password.value)
            .pipe(first())
            .subscribe(
                data =>{
                    this.router.navigate(['/mainmenu'])
                },
                error =>{
                    console.log(error);
                }
            )
    }
}
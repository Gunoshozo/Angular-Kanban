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
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService
        ){
           // если уже залогинен
           if(this.loginService.currentUserValue) 
                this.router.navigate(['/game'])
        }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email:['',Validators.required],
            password: ['',Validators.required]
        })
        this.returnUrl = '/game'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
                    console.log(data)
                    this.router.navigate([this.returnUrl])
                },
                error =>{
                    console.log(error);
                }
            )
    }
}
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, RegisterService } from 'src/app/service';
import { first } from 'rxjs/operators';

@Component({
    selector:'register',
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.css']
})

export class register implements OnInit{
    registerForm: FormGroup

    constructor(
        private formBuiler:FormBuilder,
        private router:Router,
        private loginService: LoginService,
        private registerService: RegisterService
    ){
        if(this.loginService.currentUserValue)
            this.router.navigate(['/game'])
    }

    ngOnInit() {
        this.registerForm = this.formBuiler.group({
            username: ['', Validators.required],
            email:['',Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.registerService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                        localStorage.setItem('currentUser',this.registerForm.controls.email.value)
                        this.router.navigate(['/mainmenu']);
                },
                error => {
                    console.error(error)
                });
    }
}
import { Component } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { LoginService } from './service/loginService';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'kanban-ui';
  currentUserEmail: string;

  constructor(
    private router:Router,
    private loginService:LoginService
    ){
      this.loginService.currentUser.subscribe(x => this.currentUserEmail = x)
  }

  logout(){
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
}
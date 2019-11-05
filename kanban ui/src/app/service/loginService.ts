import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue():User{
    return this.currentUserSubject.value;
  }

  public login(email:string,password:string){
      return this.http.post<any>('http://25.65.79.64/api/login',{email,password})
             .pipe(map(User =>{
              if(User){
                console.log("login")
                console.log(User)
                localStorage.setItem('currentUser',JSON.stringify(User))
                this.currentUserSubject.next(User)
              }
            }))
      }

    logout(){
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }

}
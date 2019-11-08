import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  public get currentUserValue():string{
    return this.currentUserSubject.value;
  }

  public login(email:string,password:string){
    console.log({email,password})
      return this.http.post<any>('http://25.65.79.64:8000/controller/api/sign_in',{email,password})
             .pipe(map(data =>{
               console.log(data)
              if(data['status'] == 'ok'){
                console.log("login")
                localStorage.setItem('currentUser',email)
                this.currentUserSubject.next(email)
              }
            }))
      }

    logout(){
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }

}
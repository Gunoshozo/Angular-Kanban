import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';



@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient) { }

    //прописать запрос
    register(user: User) {
        console.log(user)
        return this.http.post(`http://25.65.79.64:8000/controller/api/sign_up`, user);
    }
}
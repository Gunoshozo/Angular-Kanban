import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';



@Injectable({ providedIn: 'root' })
export class RegisterService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post(`http://controller-getkanban.apps.us-west-1.starter.openshift-online.com/controller/api/sign_up`, user);
    }
}
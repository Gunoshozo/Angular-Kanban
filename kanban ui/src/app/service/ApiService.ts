import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getCards(email: string) {
    return this.httpClient.get('http://25.65.79.64:8000/controller/api/get_cards?email='+email)
  }

  public getPoints(day:number,specs){

  }

}
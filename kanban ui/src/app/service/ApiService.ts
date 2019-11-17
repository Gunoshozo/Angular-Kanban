import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameTable } from '../models/gametable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getCards(email: string) {
    return this.httpClient.get('http://25.65.79.64:8000/controller/api/get_cards?email='+email)
  }

  public getPoints(day:number,specs){
    console.log(localStorage.getItem('tableId'))
    let anal = specs['anal']['anal']+specs['anal']['test']+specs['anal']['dev']
    let dev = specs['dev']['anal']+specs['dev']['test']+specs['dev']['dev']
    let test = specs['test']['anal']+specs['test']['test']+specs['test']['dev']
    let tableId = localStorage.getItem('tableId')
    let req = {'id_table':tableId,'day':day,'anal':anal,'dev':dev,'test':test}
    console.log(req)
    return this.httpClient.get("http://25.65.79.64:8000/controller/api/get_points?day="+day.toString()+"&anal="+anal.toString()+"&dev="+dev.toString()+"&test="+test.toString())
  }

  public postUpdatedCards(email,cards){
    return this.httpClient.post("http://25.65.79.64:8000/controller/api/change_progress/"+email,cards)
  }

  public getTables(){
    let email =  localStorage.getItem('currentUser')
    return  this.httpClient.get("http://25.65.79.64:8000/controller/api/ ?email="+email)
  }

  public join(table_id:number){
    let email = localStorage.getItem('currentUser')
    return this.httpClient.post('http://25.65.79.64:8000/controller/api/add_user_to_table',{'IdGameTable':table_id,'email':email})
  }
  public getEvent(day,firtsTest){
    return this.httpClient.get('http://25.65.79.64:8000/controller/api/get_cards?day='+day.toString()+'&firstTest='+firtsTest.toString())
  }

  public createTable(name, num){
    let email = localStorage.getItem('currentUser');
    let request = {'nameGameTable':name,'numberOfPlayers':num,'email':email}
    return this.httpClient.post('http://25.65.79.64:8000/controller/api/create_table',request)
  }

}
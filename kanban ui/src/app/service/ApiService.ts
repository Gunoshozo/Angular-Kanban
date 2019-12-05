import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameTable } from '../models/gametable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getCards(email: string) {
    let idGameTable = localStorage.getItem('tableId')
    return this.httpClient.get('http://iis-web:8080/controller/api/get_cards?email='+email+'&idGameTable='+idGameTable)
  }

  public getPoints(day:number,specs){
    let anal = specs['anal']['anal']+specs['anal']['test']+specs['anal']['dev']
    let dev = specs['dev']['anal']+specs['dev']['test']+specs['dev']['dev']
    let test = specs['test']['anal']+specs['test']['test']+specs['test']['dev']
    let tableId = localStorage.getItem('tableId')
    return this.httpClient.get("http://iis-web:8080/controller/api/get_points?id_table="+tableId+"&day="+day.toString()+"&anal="+anal.toString()+"&dev="+dev.toString()+"&test="+test.toString())
  }

  public postUpdatedCards(cards){
    let tableId = localStorage.getItem('tableId')
    let email = localStorage.getItem('currentUser');
    return this.httpClient.post("http://iis-web:8080/controller/api/change_progress",{'email':email,'cards':cards,'idGameTable':tableId})
  }

  public join(table_id:number){
    let email = localStorage.getItem('currentUser')
    return this.httpClient.post('http://iis-web:8080/controller/api/add_user_to_table',{'IdGameTable':table_id,'email':email})
  }
  public getEvent(day,firtsTest){
    let email = localStorage.getItem('currentUser')
    return this.httpClient.get('http://iis-web:8080/controller/api/get_event?day='+day.toString()+'&firstTest='+firtsTest +'&email='+email)
  }

  public createTable(){
    let email = localStorage.getItem('currentUser');
    let request = {'nameGameTable':'table '+email,'numberOfPlayers':1,'email':email}
    return this.httpClient.post('http://iis-web:8080/controller/api/create_table',request)
  }

  public newDay(){
    let tableid = localStorage.getItem('tableId')
    return this.httpClient.get('http://iis-web:8080/controller/api/new_day?idGameTable='+tableid.toString())
  }

  public updateCard(idCard,department,progress){
    return this.httpClient.post('http://iis-web:8080/controller/api/update_card',{'idCard':idCard,'department':department,'progress':progress})
  }

  public updateStatus(idCard){
    return this.httpClient.post('http://iis-web:8080/controller/api/update_status',{'idCard':idCard})
  }

  public getGraphData(){
    let email = localStorage.getItem('currentUser')
    return this.httpClient.get('http://iis-web:8080/controller/api/get_graph?email='+ email)
  }

  public getTableId(){
    let email = localStorage.getItem('currentUser');
    return this.httpClient.get('http://iis-web:8080/controller/api/get_table?email='+email)
  }

  public deleteTable(){
    let email = localStorage.getItem('currentUser');
    return this.httpClient.get('http://iis-web:8080/controller/api/delete_table?email='+email)
  }
}
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
    let anal = specs['anal']['anal']+specs['anal']['test']+specs['anal']['dev']
    let dev = specs['dev']['anal']+specs['dev']['test']+specs['dev']['dev']
    let test = specs['test']['anal']+specs['test']['test']+specs['test']['dev']

    let req = {'day':day,'anal':anal,'dev':dev,'test':test}
    console.log(req)
    return this.httpClient.get("http://25.65.79.64:8000/controller/api/get_points?day="+day.toString()+"&anal="+anal.toString()+"&dev="+dev.toString()+"&test="+test.toString())
  }

  public postUpdatedCards(email,cards){
    return this.httpClient.post("http://25.65.79.64:8000/controller/api/change_progress/"+email,cards)
  }

}
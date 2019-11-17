import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { card } from '../../models/card';
import {ApiService} from '../../service/ApiService'
import { cardComponent } from 'src/app/models/card.component';
import { LoginService } from 'src/app/service';
import { Router } from '@angular/router';


@Component({
    selector:'kanbantable',
    templateUrl:'./kanbantable.component.html',
    styleUrls:['./kanbantable.component.css']
})

export class kanbantable implements OnInit{
    CardList: card[][]
    expedice: any[] = [null,null,null,null,null,null,null,null]
    @ViewChildren(cardComponent) cc:QueryList<cardComponent>
    @Input()
    limit: number[]
    staff: any = {'anal':{'anal':2,'dev':0,'test':0},'dev':{'anal':0,'dev':3,'test':0},'test':{'anal':0,'dev':0,'test':2}}
    totalStaff:any = {'anal':0,'dev':0,'test':0};
    points: any = {'anal':0,'dev':0,'test':0};
    day:number = 8;
    EventText: string = ''
    tableID:any;

    allowPointsDistribution:boolean = false;
    blockedDepartment:boolean[] = [false,false,false]

    client: HttpClient
    
    ColNames:string[] = ['Selected','AnalProg','AnalDone','DevProg','DevDone','Test','ReadyDeploy','Deploy']

    
    constructor(private apiService:ApiService,private loginService:LoginService,private router:Router){
        //Редирект в случае, если пользователь не залогинен
        if(this.loginService.currentUserValue == null) 
                this.router.navigate(['/login'])
    }

    
    parseCard(cardJson){
        return new card(cardJson['idCard'],cardJson['nameCard'],cardJson['dataBegSession'],cardJson['dataEndSession'],cardJson['development'],cardJson['allDevelopment'],cardJson['analysis'],cardJson['allAnalysis'],cardJson['testing'],cardJson['allTesting'],cardJson['money'],cardJson['subs'],cardJson['colorCard'],cardJson['status'],cardJson['priority'])
    }

    countTotalStaff(){
        this.totalStaff['anal'] = this.staff['anal']['anal']+this.staff['dev']['anal']+this.staff['test']['anal']
        this.totalStaff['dev'] = this.staff['anal']['dev']+this.staff['dev']['dev']+this.staff['test']['dev']
        this.totalStaff['test'] = this.staff['anal']['test']+this.staff['dev']['test']+this.staff['test']['test']
    }
    
    ngOnInit(): void {
        this.countTotalStaff()
        this.getAllCards()
    }

    getAllCards(){
        let email = localStorage.getItem('currentUser')
        this.apiService.getCards(email)
        .subscribe(
            data => {
                console.log(data)
                this.CardList = []
                for(var i =0;i<8;i++){
                    this.CardList[i] = []
                    let len = data['cards']
                    if(len.hasOwnProperty(this.ColNames[i])){
                        for(var j =0; j< len[this.ColNames[i]]['length'];j++){
                            var tmpCard = data['cards'][this.ColNames[i]][j.toString()]

                            var Card = this.parseCard(tmpCard)
                            if(Card.color=='White' && i != 0 && i != 7){
                                this.expedice[i] = Card
                            } 
                            else{
                                this.CardList[i].push(Card)
                            }
                        }
                }
                }
                
            },
            error =>{
                console.error('error')
            }
        )
    }

    logout(){
        this.loginService.logout()
        this.router.navigate(['/login'])
    }

    // Кустарный инит
    // ngOnInit(){
    //     this.countTotalStaff()
    //     this.CardList = []
    //             for(var i =0;i<8;i++){
    //                 this.CardList[i] = []
    //                 for(var j =0; j< 1;j++){
    //                     var Card = new card(i*j,'name',1,0,5,7,5,8,9,14,25,2,'White',this.ColNames[i],1)
    //                     if(Card.color='White' && i != 0 && i != 7){
    //                         this.expedice[i]= Card
    //                     } 
    //                     else{
    //                     this.CardList[i].push(Card)
    //                     }
    //                }
    //             }
    // }

    confirmChanges(){
        let resp = {'anal':[],'dev':[],'test':[]}
        this.cc.toArray().forEach(c =>{
            if(c.isModified){
                switch(c.Card.status){
                    case 1: {
                        resp['anal'].push(c.Card)
                        break;
                    }
                    case 3:{
                        resp['dev'].push(c.Card)
                        break;
                    }
                    case 5:{
                        resp['test'].push(c.Card)
                    }
                }
            }
        })
        let email = localStorage.getItem('currentUser')
        this.apiService.postUpdatedCards(email,resp)
        .subscribe( data =>{
            if(data['status'] = 'ok'){
                this.getAllCards()
                this.updateDay()
            }
            else{
                console.error('fail')
            }
        })
    }

    updateDay(){
        this.day++;
        // if(this.day == 31)
        // {
        //     this.router.navigate(['/report'])
        //     //передача данных из графиков в отчет ( скорее всего через сервис)
        // }
        this.allowPointsDistribution = false;
        this.points = {'anal':0,'dev':0,'test':0};
        this.cc.toArray().forEach(c=>{
            c.updateOlds()
        })
        let Firstid = this.CardList[5][0].idCard
        this.apiService.getEvent(this.day,Firstid)
        .subscribe(data =>{
                this.processEvent(data)
        },
        error =>{
            console.error('event error')
        })
        //Какой-нибудь апдейт в график
    }

    processEvent(e){
        this.EventText = e
        if(e['command'] != ''){
            let words =e['command'].split(' ')
            let first = words.shift()   
            switch(first){
                case 'block':{ this.block(words); break;}
                case 'add':{ this.add(words); break;}
                case 'set':{ this.set(words); break;}
            }
        }
    }

    block(words){
        switch(words[0]){
            case 'anal':{ this.blockedDepartment[0] = true;break;}
            case 'dev':  {this.blockedDepartment[1] = true;break;}
            case 'test':{ this.blockedDepartment[2]=true;break;}
        }
    }

    add(words){
        switch(words[0]){
            case 'tester':{this.staff['test']['test']++;break}
            case 'developer':{this.staff['dev']['dev']++;break}
            case 'analyst':{this.staff['anal']['anal']++;break}
        }
        this.countTotalStaff()
    }

    set(words:string[]){
        switch(words[0]){
            case 'WIP_Ready':{this.limit[6] = parseInt(words[1])}
        }

    }


    recieveBoolean($event){
        this.allowPointsDistribution = $event;
    }
    
}
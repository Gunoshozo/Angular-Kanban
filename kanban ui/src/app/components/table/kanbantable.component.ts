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
    @ViewChildren(cardComponent) cc:QueryList<cardComponent>
    @Input()
    limit: number[]
    staff: any = {'anal':{'anal':2,'dev':0,'test':0},'dev':{'anal':0,'dev':3,'test':0},'test':{'anal':0,'dev':0,'test':2}}
    totalStaff:any = {'anal':0,'dev':0,'test':0};
    points: any = {'anal':0,'dev':0,'test':0};
    day:number = 8;
    allowPointsDistribution:boolean = false;
    
    client: HttpClient
    

    ColNames:string[] = ['Selected','AnalProg','AnalDone','DevProg','DevDone','Test','ReadyDeploy','Deploy']

    
    constructor(private apiService:ApiService,private loginService:LoginService,private router:Router){
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
        console.log(localStorage.getItem('currentUser'))
        let email = localStorage.getItem('currentUser')
        this.apiService.getCards(email)
        .subscribe(
            data => {
                this.CardList = []
                for(var i =0;i<8;i++){
                    this.CardList[i] = []
                    let len = data['cards']
                    if(len.hasOwnProperty(this.ColNames[i])){
                        for(var j =0; j< len[this.ColNames[i]]['length'];j++){
                            var tmpCard = data['cards'][this.ColNames[i]][j.toString()]

                            var Card = this.parseCard(tmpCard)
                            this.CardList[i].push(Card)
                        }
                }
                
                }
                
            },
            error =>{
                console.log('error')
            }
        )
    }

    logout(){
        this.loginService.logout()
        this.router.navigate(['/login'])
    }

    //Самопальный инит
    // ngOnInit(){
    //     this.countTotalStaff()
    //     this.CardList = []
    //             for(var i =0;i<8;i++){
    //                 this.CardList[i] = []
    //                 for(var j =0; j< 2;j++){
    //                     var Card = new card(i*j,'name',1,0,5,5,5,8,9,14,25,2,'Orange',i,1)
    //                     this.CardList[i].push(Card)
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
        let email = 'stas'
        this.apiService.postUpdatedCards(email,resp)
        .subscribe( data =>{
            console.log(data)
            if(data['status'] = 'ok'){
                this.cc.toArray().forEach(c=>{
                    c.updateOlds()
                })
                this.getAllCards()
                this.updateDay()
            }
            else{
                console.log('fail')
            }
        })
    }

    updateDay(){
        this.day++;
        this.allowPointsDistribution = false;
        this.points = {'anal':0,'dev':0,'test':0};
        //Какой-нибудь апдейт в график
    }

    recieveBoolean($event){
        this.allowPointsDistribution = $event;
    }
    
}
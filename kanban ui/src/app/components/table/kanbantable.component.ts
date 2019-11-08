import { Component, OnInit, Input, AfterContentInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { card } from '../../models/card';
import {ApiService} from '../../service/ApiService'
import { specsDistribution } from '../specsDistribution/specsDistrib.component';


@Component({
    selector:'kanbantable',
    templateUrl:'./kanbantable.component.html',
    styleUrls:['./kanbantable.component.css']
})

export class kanbantable implements OnInit{
    CardList: card[][]
    ExpediseCards: card[] 
    @Input()
    limit: number[]
    staff: any = {'anal':{'anal':2,'dev':0,'test':0},'dev':{'anal':0,'dev':3,'test':0},'test':{'anal':0,'dev':0,'test':2}}
    totalStaff:any = {'anal':0,'dev':0,'test':0};
    points: any = {'anal':0,'dev':0,'test':0};
    day:number = 1;
    pointsDistribution:boolean;
    
    client: HttpClient
    

    @ViewChild(specsDistribution,{static:false})
    
    private status = ['Selected','AnalProg','AnalDone','DevProg','DevDone','Test','ReadyDeploy','Deploy']

    
    constructor(private apiService:ApiService){
    }

    parseCard(cardJson){
        return new card(cardJson['nameCard'],cardJson['dataBegSession'],cardJson['dataEndSession'],cardJson['development'],cardJson['allDevelopment'],cardJson['analysis'],cardJson['allAnalysis'],cardJson['testing'],cardJson['allTesting'],cardJson['money'],cardJson['subs'],cardJson['colorCard'],cardJson['status'],cardJson['priority'])
    }

    countTotalStaff(){
        this.totalStaff['anal'] = this.staff['anal']['anal']+this.staff['dev']['anal']+this.staff['test']['anal']
        this.totalStaff['dev'] = this.staff['anal']['dev']+this.staff['dev']['dev']+this.staff['test']['dev']
        this.totalStaff['test'] = this.staff['anal']['test']+this.staff['dev']['test']+this.staff['test']['test']
    }
    
    ngOnInit(): void {
        let email = 'stasKruto@gmail.com'
        this.countTotalStaff()
        //email = localStorage.getItem('currentUser')
        this.apiService.getCards(email)
        .subscribe(
            data => {
                console.log(data['cards'][this.status[2]])
                this.CardList = []
                for(var i =0;i<8;i++){
                    this.CardList[i] = []
                    let len = data['cards']
                    if(len.hasOwnProperty(this.status[i]))
                    for(var j =0; j< len[this.status[i]]['length'];j++){
                        var tmpCard = data['cards'][this.status[i]][j.toString()]
                        var Card = this.parseCard(tmpCard)
                        this.CardList[i].push(Card)
                        console.log(this.CardList)
                    }
                
                }
                
            },
            error =>{
                console.log('error')
            }
        )
    }
    
}
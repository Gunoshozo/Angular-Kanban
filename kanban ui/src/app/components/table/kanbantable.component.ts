import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { card } from '../../models/card';
import {ApiService} from '../../service/ApiService'
import { User } from 'src/app/models/user';
import { first } from 'rxjs/operators';


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
    
    client: HttpClient
    
    private status = ['Selected','AnalProg','AnalDone','DevProg','DevDone','Test','ReadyDeploy','Deploy']

    
    constructor(private apiService:ApiService){
    }

    parseCard(cardJson){
        return new card(cardJson['nameCard'],cardJson['dataBegSession'],cardJson['dataEndSession'],cardJson['development'],cardJson['allDevelopment'],cardJson['analysis'],cardJson['allAnalysis'],cardJson['testing'],cardJson['allTesting'],cardJson['money'],cardJson['subs'],cardJson['colorCard'],cardJson['status'],cardJson['priority'])
    }

    // ngAfterContentInit(): void {
    //     let email = 'stas'
    //     this.apiService.getCards(email)
    //     .subscribe(
    //         data => {
    //             console.log(this.parseCard(data['cards']['Selected']['0']));
    //             this.CardList = []
    //             for(var i =0;i<8;i++){
    //                 this.CardList[i] = []
    //                 let len = data['cards']['Selected']['length']
    //                 for(var j =0; j< length;j++){
    //                     var tmpCard = data['cards'][this.status[i]][j.toString()]
    //                     var Card = this.parseCard(tmpCard)
    //                     this.CardList[i].unshift(Card)
    //                 }
    //             }
    //         },
    //         error =>{
    //             console.log('error')
    //         }
    //     )
    // }
    
    ngOnInit(): void {
        let email = 'stasKruto@gmail.com'
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
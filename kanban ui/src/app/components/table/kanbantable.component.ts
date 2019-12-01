import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { card } from '../../models/card';
import {ApiService} from '../../service/ApiService'
import { cardComponent } from 'src/app/models/card.component';
import { LoginService } from 'src/app/service';
import { Router } from '@angular/router';
import { graph } from '../graph/graph.component';


@Component({
    selector:'kanbantable',
    templateUrl:'./kanbantable.component.html',
    styleUrls:['./kanbantable.component.css']
})

export class kanbantable implements OnInit{
    CardList: card[][]
    Deployed: card[] = []
    expedice: any[] = [null,null,null,null,null,null,null]
    @ViewChildren(cardComponent) cc:QueryList<cardComponent>
    @ViewChild(graph,{static:false}) Graph:graph;
    @Input()
    limit: number[]
    staff = {'anal':{'anal':2,'dev':0,'test':0},'dev':{'anal':0,'dev':3,'test':0},'test':{'anal':0,'dev':0,'test':2}}
    defaultStaff: any = {'anal':{'anal':2,'dev':0,'test':0},'dev':{'anal':0,'dev':3,'test':0},'test':{'anal':0,'dev':0,'test':2}}
    totalStaff:any = {'anal':0,'dev':0,'test':0};
    points: any = {'anal':0,'dev':0,'test':0};
    day:number;
    EventText: string = ''
    modalOpen = false
    money:number


    allowPointsDistribution:boolean = false;
    blockedDepartment:boolean[] = [false,false,false]

    client: HttpClient
    
    ColNames:string[] = ['Selected','AnalProg','AnalDone','DevProg','DevDone','Test','ReadyDeploy','Deploy']

    
    constructor(private apiService:ApiService,private loginService:LoginService,private router:Router){
        //Редирект в случае, если пользователь не залогинен
        // if(this.loginService.currentUserValue == null) 
        //         this.router.navigate(['/login']) 
        // if(localStorage.getItem('tableId')== null)               
        //     this.router.navigate(['/mainmenu'])
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
                this.day = data['day']
                this.CardList = []
                for(var i =0;i<7;i++){
                    this.CardList[i] = []
                    this.expedice[i] = null
                    let len = data['cards']
                    if(len.hasOwnProperty(this.ColNames[i])){
                        for(var j =0; j< len[this.ColNames[i]]['length'];j++){
                            var tmpCard = data['cards'][this.ColNames[i]][j.toString()]
                            var Card = this.parseCard(tmpCard)
                            if(Card.color=='White' ){
                                if(i == 0)
                                    Card.hidden = true
                                this.expedice[i] = Card
                            }
                        }
                    }
                }
                let len = data['cards']
                    if(len.hasOwnProperty(this.ColNames[7])){
                        for(var j =0; j < len[this.ColNames[7]]['length'];j++){
                            var tmpCard = data['cards'][this.ColNames[7]][j.toString()]
                            var Card = this.parseCard(tmpCard)
                            this.Deployed.push(Card)
                        }
                    }
                
            },
            error =>{
                console.error('error')
            }
        )
    }

    toMain(){
        this.router.navigate(['/mainmenu'])
    }

    logout(){
        this.loginService.logout()
        this.router.navigate(['/login'])
    }

    confirmChanges(){
        this.allowPointsDistribution = false
        let resp = {'anal':[],'dev':[],'test':[]}
        this.cc.toArray().forEach(c =>{
            if(c.isModified){
                switch(c.Card.status){
                    case 'AnalProg': {
                        resp['anal'].push(c.Card)
                        break;
                    }
                    case 'DevProg':{
                        resp['dev'].push(c.Card)
                        break;
                    }
                    case 'Test':{
                        resp['test'].push(c.Card)
                        break;
                    }
                }
            }
        })
        let email = localStorage.getItem('currentUser')
        this.apiService.postUpdatedCards(resp)
        .subscribe( data =>{
            if(data['status'] = 'ok'){
                this.getAllCards()
                this.updateDay()
            }
            else{
                console.error('fail')
                this.allowPointsDistribution = true
            }
        },error=>{
            this.allowPointsDistribution = true
        })
    }

    
    updateDay(){       
        this.points = {'anal':0,'dev':0,'test':0}
        this.cc.toArray().forEach(c=>{
            c.updateOlds()
        })
        let Firstid = null
        if(this.CardList[5][0] != undefined){
            Firstid = this.CardList[5][0].idCard
        }
        this.apiService.getEvent(10,Firstid)
        .subscribe(data =>{
                this.processEvent(data)
                alert('У вас новое событие, откройте раздел "События"')
        },
        error =>{
            console.error('event error')
        })
        this.staff = this.defaultStaff
        this.Graph.addData()
        this.Graph.DrawGraphs()
    }

    processEvent(e){
        this.EventText =e['text']
        if(e['command'] != ''){
            let words =e['command'].split(' ')
            let first = words.shift()   
            switch(first){
                case 'block':{ this.block(words); break;}
                case 'add':{ this.add(words); break;}
                case 'set':{ this.set(words); break;}
                case 'unblock':{this.unblock(words);break;}
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

    unblock(words){
        switch(words[0]){
            case 'anal':{ this.blockedDepartment[0] = false;break;}
            case 'dev':  {this.blockedDepartment[1] = false;break;}
            case 'test':{ this.blockedDepartment[2] = false;break;}
        }
    }

    add(words){
        switch(words[0]){
            case 'tester':{this.staff['test']['test']++; this.defaultStaff['test']['test']++;break}
            case 'developer':{this.staff['dev']['dev']++;this.defaultStaff['dev']['dev']++;break}
            case 'analyst':{this.staff['anal']['anal']++;this.defaultStaff['anal']['anal']++;break}
            case 'card':{this.pullEventCard();break;}
        }
        this.countTotalStaff()
    }

    pullEventCard(){
        this.expedice[0].hidden = false
        this.pullInCard(this.expedice[0].idCard)

    }

    set(words:string[]){
        switch(words[0]){
            case 'WIP_Ready':{this.limit.push(parseInt(words[1]))}
        }

    }

    pullPriority(I,J){
        if(I != 0)
            return true
        else{
            if(this.CardList[I][J].color == 'Orange' ){
                for(var j = 0; j<J; j++){
                    if(this.CardList[0][j].color == 'Orange')
                        return false
                }
                return true
            }
            else{
                return true
            }
        }
    }


    moveCard($event){
        for(let i =1;i <7;i++){
            for(let j = 0; j < this.CardList[i].length;j++){
                if(this.CardList[i][j].idCard == $event){
                    let department
                    let progress
                    switch(i){
                    case 1:{ department = 'anal'; progress=this.CardList[i][j].CurrentAnalysis; break}
                    case 3:{ department = 'dev'; progress=this.CardList[i][j].CurrentDevelopment; break}
                    case 5:{ department = 'test';progress=this.CardList[i][j].CurrentTesting; break}
                    }
                    this.apiService.updateCard($event,department,progress)
                    .subscribe(data=>{
                        let c:card = this.CardList[i][j]
                        c.updateStatus()    
                        this.CardList[i+1].unshift(c)
                        this.CardList[i].splice(j,1)
                        this.cc.forEach(element => {
                            if(element.Card.idCard == c.idCard)
                                element.updateOlds()
                        })
                        if(i+1 == 6){
                            this.pullInCard($event)
                        }
                        return
                    },error =>{
                        console.error(error)
                    })
                    
                }
            }
        }
        for(let i=0;i<7;i++){
            if(this.expedice[i] != null){
                if(this.expedice[i].idCard == $event){
                    let department
                    let progress
                    switch(i){
                        case 1:{ department = 'anal'; progress=this.expedice[i].CurrentAnalysis; break}
                        case 3:{ department = 'dev'; progress=this.expedice[i].CurrentDevelopment; break}
                        case 5:{ department = 'test';progress=this.expedice[i].CurrentTesting; break}   
                    }
                    this.apiService.updateCard($event,department,progress)
                    .subscribe(data =>{
                    let Card:card = this.expedice[i]
                    Card.updateStatus()
                    if(i == 6){
                        this.Deployed.unshift(Card)
                    }
                    else{
                        this.expedice[i+1] = Card
                    }
                    this.expedice[i] = null
                    this.cc.forEach(element => {
                        if(element.Card.idCard == Card.idCard)
                            element.updateOlds()
                    })
                    return
                }, error=>{
                    console.error(error)
                })
                }
            }
        }
    }

    canPull(colNum){
        switch(colNum){
            case 0:{
                //selected ->analysis
                return (this.CardList[colNum+1].length+this.CardList[colNum+2].length < this.limit[0])
            }
            case 2:{
                //analysis ->dev
                return (this.CardList[colNum+1].length+this.CardList[colNum+2].length < this.limit[1])
            }
            case 4:{
                //dev -> test
                return (this.CardList[colNum+1].length < this.limit[2])
            }
            case 5:{
                return (this.limit.length==3 || this.CardList[colNum+1].length <  this.limit[3])
            }
            case 6:{
                return true
            }
            default:{
                return false
            }
        }
    }

    pullInCard($event){
        this.apiService.updateStatus($event)
        .subscribe(data=>{
                for(let i =0;i <7;i++){
                    for(let j = 0; j < this.CardList[i].length;j++){
                        if(this.CardList[i][j].idCard == $event){
                            let c:card = this.CardList[i][j];
                            c.updateStatus()
                            if(c.status == 'AnalProg')
                                c.DayReady = this.day;
                            if(i == 6){
                                this.Deployed.unshift(c)
                            }
                            else{
                                this.CardList[i+1].unshift(c)
                            }
                            this.CardList[i].splice(j,1)
                            return
                        }
                    }
                }
                for(let i=0;i<7;i++){
                    if(this.expedice[i] != null){
                        if(this.expedice[i].idCard == $event){
                            let Card:card = this.expedice[i]
                            Card.updateStatus()
                            if(i == 6){
                                this.Deployed.unshift(Card)
                            }
                            else{
                                this.expedice[i+1] = Card
                            }
                            this.expedice[i] = null
                            return
                        }
                    }
                }
    },error=>{
        console.error(error)    
    })
    }

    getMoney($event){
        this.money = $event;
        this.openModal(true)
    }

    recieveBoolean($event){
        this.allowPointsDistribution = $event
    }

    openModal(flag){
        this.modalOpen = flag
    }
}
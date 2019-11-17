import {card} from './card'
import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
    selector:'cardComponent',
    templateUrl:'./card.html',
    styleUrls:['./card.css']
})

export class cardComponent implements OnInit{
    
    
    @Input('CardObject')
    Card:card
    @Input('canUpgrade')
    canUpgrade:boolean = false;
    @Input('points')
    points = {'anal':0,'dev':0,'test':0}
    notBlocked:boolean = true;
    OldValues: { 'anal': number; 'dev': number; 'test': number; };

    ngOnInit(): void {
        this.OldValues = {'anal':this.Card.CurrentAnalysis,'dev': this.Card.CurrentDevelopment,'test':this.Card.CurrentTesting}
    }

    addToStatus(num){
        switch(this.Card.status){
            case 'AnalProg':{
                    if(num > 0 &&  this.Card.CurrentAnalysis < this.Card.TotalAnalysis  && this.points['anal']>0){
                        this.Card.CurrentAnalysis+=num
                        this.points['anal']--
                    }
                    if(num < 0 && this.Card.CurrentAnalysis > this.OldValues['anal'])
                    {
                        this.Card.CurrentAnalysis+=num
                        this.points['anal']++
                    }
                    return
            }
            case 'DevProg':{
                if(num > 0 &&  this.Card.CurrentDevelopment < this.Card.TotalDevelopment  && this.points['dev']>0){
                    this.Card.CurrentDevelopment+=num
                    this.points['dev']--
                }
                if(num < 0 && this.Card.CurrentDevelopment > this.OldValues['dev'])
                {
                    this.Card.CurrentDevelopment+=num
                    this.points['dev']++
                }
                return
            }
            case 'Test':{
                if(num > 0 &&  this.Card.CurrentTesting < this.Card.TotalTesting  && this.points['test']>0){
                    this.Card.CurrentTesting+=num
                    this.points['test']--
                }
                if(num < 0 && this.Card.CurrentTesting > this.OldValues['test'])
                {
                    this.Card.CurrentTesting+=num
                    this.points['test']++
                }
                return
            }
        }
    } 
    public get isModified(){
        return this.OldValues['anal'] != this.Card.CurrentAnalysis || this.OldValues['dev'] != this.Card.CurrentDevelopment || this.OldValues['test'] != this.Card.CurrentTesting
    }  

    public get isMaxed():boolean{
        return (this.Card.status == 'AnalProg' && this.OldValues['anal']==this.Card.TotalAnalysis) || (this.Card.status == 'DevProg' && this.OldValues['dev']==this.Card.TotalDevelopment) 
        || (this.Card.status == 'Test' && this.OldValues['test']==this.Card.TotalTesting)
    }

    updateOlds(){
        this.OldValues['anal'] = this.Card.CurrentAnalysis
        this.OldValues['dev'] = this.Card.CurrentDevelopment
        this.OldValues['test'] = this.Card.CurrentTesting
    }

    block(){
        this.notBlocked= false;
    }

    unblock(){
        this.notBlocked = true;
    }
}
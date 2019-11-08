import {card} from './card'
import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
    selector:'cardComponent',
    templateUrl:'./card.html',
    styleUrls:['./card.css']
})

export class cardComponent implements OnInit{
    OldValues: { 'anal': number; 'dev': number; 'test': number; };
    ngOnInit(): void {
        this.OldValues = {'anal':this.Card.CurrentAnalysis,'dev': this.Card.CurrentDevelopment,'test':this.Card.CurrentTesting}
    }
    @Input('CardObject')
    Card:card
    @Input('canUpgrade')
    canUpgrade:boolean = true;
    @Input('points')
    points = {'anal':3,'dev':5,'test':8}

    addToStatus(num){
        switch(this.Card.status){
            case 1:{
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
            case 3:{
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
            case 5:{
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
    isModified(){
        return this.OldValues['anal'] != this.Card.CurrentAnalysis || this.OldValues['dev'] != this.Card.CurrentDevelopment || this.OldValues['test'] != this.Card.CurrentTesting
    }  

    updateOlds(){
        this.OldValues['anal'] = this.Card.CurrentAnalysis
        this.OldValues['dev'] = this.Card.CurrentDevelopment
        this.OldValues['test'] = this.Card.CurrentTesting
    }
}
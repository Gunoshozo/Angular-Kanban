import {card} from './card'
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

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
    @Input()
    canPull:boolean;
    notBlocked:boolean = true;
    TotalBlockPoints:number;
    CurrentBlockPoints:number;
    OldValues: { 'anal': number; 'dev': number; 'test': number; };
    @Output() moveEvent = new EventEmitter<number>();
    @Output() pullEvent = new EventEmitter<number>();
    @Input() priority;


    ngOnInit(): void {
        this.OldValues = {'anal':this.Card.CurrentAnalysis,'dev': this.Card.CurrentDevelopment,'test':this.Card.CurrentTesting}
    }

    addToStatus(num){
        switch(this.Card.status){
            case 'AnalProg':{
                    if(num > 0 &&  this.Card.CurrentAnalysis < this.Card.TotalAnalysis  && this.points['anal']>0){
                        this.Card.CurrentAnalysis+=num
                        this.points['anal']--
                        if(this.Card.CurrentAnalysis == this.Card.TotalAnalysis){
                            this.moveEvent.emit(this.Card.idCard)
                            this.canUpgrade = false;
                        }
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
                    if(this.Card.CurrentDevelopment == this.Card.TotalDevelopment){
                        this.moveEvent.emit(this.Card.idCard)
                        this.canUpgrade = false;
                    }
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
                    if(this.Card.CurrentTesting == this.Card.TotalTesting){
                        this.moveEvent.emit(this.Card.idCard)
                        this.canUpgrade = false;
                    }
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

    public get isMaxed(){
        return ((this.Card.status == 'AnalProg' ||this.Card.status == 'AnalDone') && this.OldValues['anal']==this.Card.TotalAnalysis) || ((this.Card.status == 'DevProg' || this.Card.status=='DevDone') && this.OldValues['dev']==this.Card.TotalDevelopment) 
        || (this.Card.status == 'Test' && this.OldValues['test']==this.Card.TotalTesting)
    }


    
    public get isPullable(){
        return ((this.canPull && (this.Card.status=='Selected' || this.Card.status=="ReadyDeploy"|| this.isMaxed)) || (this.Card.color == "White" && this.isMaxed)) && this.priority
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
        localStorage.removeItem('blockedCard')
    }

    addToUnblock(){
        if(this.CurrentBlockPoints < this.TotalBlockPoints){
            this.points['dev']--;
            this.CurrentBlockPoints++;
            if(this.CurrentBlockPoints == this.TotalBlockPoints){
                this.unblock()
                this.canUpgrade = false;
            }
                
        }
    }

    pull(){
        this.pullEvent.emit(this.Card.idCard)
    }

    public getBlocked(){
        return '● '.repeat(this.CurrentBlockPoints) + '○ '.repeat(this.TotalBlockPoints-this.CurrentBlockPoints)
    }
}
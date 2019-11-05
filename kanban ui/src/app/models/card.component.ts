import {card} from './card'
import { Component, Input } from '@angular/core';

@Component({
    selector:'cardComponent',
    templateUrl:'./card.html',
    styleUrls:['./card.css']
})

export class cardComponent{
    @Input('CardObject')
    Card:card
    
}
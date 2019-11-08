import { Component, ViewChild } from '@angular/core';
import { kanbantable } from '../table';

@Component({
    selector:'game',
    templateUrl:'./game.component.html',
    styleUrls:['./game.component.css']
})

export class gameComponent{

    @ViewChild(kanbantable,{static:false}) table; 
}
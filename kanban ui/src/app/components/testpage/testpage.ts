import { Component, Input, OnInit, Output } from "@angular/core";
import { card } from 'src/app/models/card';


@Component({
    selector:'testpage',
    templateUrl:'./testpage.html',
    styleUrls:['./testpage.css']
})

export class testpage implements OnInit{
    Card:card;

    ngOnInit(): void {
        this.Card  = new card(228,'name',1,0,2,10,6,15,8,17,12,4,'Orange',5,'4')
    }

  
}


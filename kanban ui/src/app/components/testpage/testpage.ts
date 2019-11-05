import { Component, Input } from "@angular/core";
import { cardComponent } from 'src/app/models/card.component';
import { card } from 'src/app/models/card';

@Component({
    selector:'testpage',
    templateUrl:'./testpage.html',
    styleUrls:['./testpage.css']
})

export class testpage{
    @Input()
    TestCard: cardComponent;


    generateCard(){
        return new card('5T4S Huilo','1','12',4,20,5,15,3,7,0,23,'Violet','Selected','228')
    }

}
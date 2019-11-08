import { Component, Input } from "@angular/core";
import { ApiService } from 'src/app/service/ApiService';

@Component({
    selector:'specsDistribution',
    templateUrl:'./specsDistrib.component.html',
    styleUrls:['./specsDistrib.component.css']
})

export class specsDistribution{

    @Input()
    specs: any;
    @Input()
    totalSpecs:any;
    @Input()
    points:any;

    @Input()
    apiService:ApiService;

    @Input()
    day: number

    add(num:number,a,b){
        if(num<0)
            this.specs[a][b] = Math.max(0,this.specs[a][b]+num) 
        if(num>0){
            if(this.countFree(b)>0)
                this.specs[a][b] = Math.min(this.totalSpecs[b],this.specs[a][b]+num) 
        }
        event.stopPropagation();
    }

    countFree(who){
        return this.totalSpecs[who] - this.specs['anal'][who]-this.specs['dev'][who]-this.specs['test'][who]
    }

    distribute(){
        let data = this.apiService.getPoints(this.day,this.specs)
    }
}


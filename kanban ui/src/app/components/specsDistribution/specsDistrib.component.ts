import { Component, Input, Output,EventEmitter } from "@angular/core";
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

    @Input() specsDistributed;

    @Input() blockedDepartment:boolean[] = []

    @Output() specsDistributedEmitter = new EventEmitter<boolean>()
    
    

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

    distributeSpecs(){
        this.apiService.getPoints(this.day,this.specs).subscribe(
            data =>{
                if(data['status']=='ok'){
                    this.points['anal'] = data['anal']
                    this.points['dev'] = data['dev']
                    this.points['test'] = data['test']
                    this.specsDistributed = true;
                    this.specsDistributedEmitter.emit(this.specsDistributed)
                }
                else{
                    console.error('fail')
                }
            },
            error =>{
                console.error(error)
            }
        )
    }

    // distributeSpecs(){
    //     this.points['anal'] = 5
    //     this.points['dev'] = 6
    //     this.points['test'] = 7
    //     this.specsDistributed = true
    //     this.specsDistributedEmitter.emit(this.specsDistributed)

    // }
}


import { OnInit, Component} from '@angular/core'
import * as CanvasJS from 'src/assets/canvasjs.min'
import { ApiService } from 'src/app/service/ApiService'
import { Router } from '@angular/router'
import { LoginService } from 'src/app/service'


@Component({
    templateUrl:'report.component.html',
    styleUrls:['./report.component.css']
})

export class report implements OnInit{
    

    passedTest:any[] =[]
    passedDev:any[] = []
    passedAnalysis:any[] = []
    passedSelected:any[] = []

    money:any[] = []

    mdlSampleIsOpen = false;

    

    constructor(private apiService:ApiService,private router:Router,private loginService:LoginService){
        if(this.loginService.currentUserValue == null) 
                this.router.navigate(['/login']) 
        if(localStorage.getItem('tableId')== null)               
            this.router.navigate(['/mainmenu'])
    }

    ngOnInit(): void {
        this.getData()
        this.DrawGraphs()
        this.apiService.deleteTable()
        .subscribe(data=>{
            localStorage.removeItem('tableId')
        },error=>{
            console.error(error)
        })
    }

    getData(){
        this.apiService.getGraphData()
        .subscribe(data=>{
            let graphData = data['graphData']
            for(var i =0;i<graphData.length;i++){
                this.passedTest.push({x:graphData[i]['day'],y:graphData[i]['deploy']})
                this.passedDev.push({x:graphData[i]['day'],y:graphData[i]['testing']})
                this.passedAnalysis.push({x:graphData[i]['day'],y:graphData[i]['development']})
                this.passedSelected.push({x:graphData[i]['day'],y:graphData[i]['analysis']})
                this.money.push({x:graphData[i]['day'],y:graphData[i]['cost']})
                
            }
        },error =>{
            console.error(error)
        }
        )
    }

    DrawGraphs(){
        var CFD = new CanvasJS.Chart("CFD", {
            animationEnabled: true,
            title:{
                text: "Накопительная схема"
            },
            axisX:{
                includeZero:false,
                gridThickness:1,
                minimum:9,
                interval:1
            },
            axisY:{
                includeZero: false,
                minimum:0,
                interval:1
            },
            data: [{        
                type: "line",     
                showInLegend:true,
                legendText:'Завершенные',
                color:'green',
                dataPoints: this.passedTest
            },
            {        
                type: "line",     
                showInLegend:true,
                legendText:'Выпущенные из разработки',
                color:'blue',
                dataPoints: this.passedDev
            },
            {        
                type: "line",     
                showInLegend:true,
                legendText:'Выпущенные из аналитики',
                color:'red',
                dataPoints: this.passedAnalysis
            },
            {        
                type: "line",     
                showInLegend:true,
                legendText:'Начатых',
                color:'brown',
                dataPoints: this.passedSelected
            }
        ]
        });
        var Revenue = new CanvasJS.Chart("Revenue", {
            animationEnabled: true,
            title:{
                text: "Прибыль"
            },
            axisX:{
                includeZero:false,
                gridThickness:1,
                minimum:9,
                interval:1
            },
            axisY:{
                includeZero: false
            },
            data: [{        
                type: "line",     
                color:'orange',
                dataPoints: this.money
            }
        ]
        });
        CFD.render()
        Revenue.render();
    }

    toMain(){
        this.router.navigate(['/mainmenu'])
    }

}
import { Component, AfterViewInit, OnInit, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min'
import { ApiService } from 'src/app/service/ApiService';

@Component({
    selector:'graph',
    templateUrl:'graph.component.html',
    styleUrls:['graph.component.css']
})
export class graph implements AfterViewInit,OnInit {
    

    
        passedTest:any[] =[]
        passedDev:any[] = []
        passedAnalysis:any[] = []
        passedSelected:any[] = []

        money:any[] = []

        @Output() balance = new EventEmitter<number>()


        ButtonToggle:boolean

        constructor(private apiService:ApiService){}

        ngOnInit(){
            this.ButtonToggle = true
        }

        ngAfterViewInit() {
            this.getData()
            this.DrawGraphs()
        }

        toggle(){
            this.ButtonToggle = !this.ButtonToggle;
            event.stopPropagation();
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
                if((graphData.length)%3 == 0 && graphData.length !=0)
                    this.balance.emit(this.money[graphData.length-1])
            },error =>{
                console.error(error)
            }
            )
        }

        addData(){
            this.apiService.getGraphData()
            .subscribe(data=>{
                let graphData = data['graphData']
                let i = graphData.length-1
                this.passedTest.push({x:graphData[i]['day'],y:graphData[i]['deploy']})
                this.passedDev.push({x:graphData[i]['day'],y:graphData[i]['testing']})
                this.passedAnalysis.push({x:graphData[i]['day'],y:graphData[i]['development']})
                this.passedSelected.push({x:graphData[i]['day'],y:graphData[i]['analysis']})
                this.money.push({x:graphData[i]['day'],y:graphData[i]['cost']})    
                }
            ,error =>{
                console.error(error)
            }
            )
        }

        DrawGraphs(){
            var CFD = new CanvasJS.Chart("CFD", {
                animationEnabled: true,
                height:500,
                width:600,
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
                height:500,
                width:600,
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
}
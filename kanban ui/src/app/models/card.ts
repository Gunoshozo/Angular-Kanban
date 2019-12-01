import { VirtualTimeScheduler } from 'rxjs'

export class card{
    idCard: number
    CardName: string
    DayReady: number
    DayDeployed: number
    CurrentDevelopment: number
    TotalDevelopment: number
    CurrentAnalysis: number
    TotalAnalysis: number
    CurrentTesting: number
    TotalTesting: number
    money: number
    subs: number
    color: any
    status: any
    priority: number
    hidden:boolean

    // constructor(i:number){
    //     this.CardName = 'S'+i.toString()
    //     this.DateBegSession = 2
    //     this.CurrentAnalysis = 4
    //         this.TotalAnalysis = 20
    //         this.CurrentDevelopment = 0
    //         this.TotalDevelopment = 15
    //         this.CurrentTesting = 0
    //         this.TotalTesting = 10
    //         this.money = 1000
    //         this.subs = 10
    //         this.color = 2
    //         this.status = 0
    //         this.priority = 0
    // }

    constructor(id,name,begdate,enddate,currentdev,totaldev,curentanal,totalanal,currenttest,totaltest,money,subs,color,status,priority){
        this.idCard = id
        this.CardName = name
        this.DayReady = begdate
        this.DayDeployed = enddate
        this.CurrentDevelopment =currentdev
        this.TotalDevelopment = totaldev
        this.CurrentAnalysis = curentanal
        this.TotalAnalysis = totalanal
        this.CurrentTesting = currenttest
        this.TotalTesting =totaltest
        this.money= money
        this.subs = subs
        this.color = color
        this.status = status
        this.priority = priority
        this.hidden = false
    }

    //Функция возвращает информацию для
    //правого верхнего угла карты в зависимости от ее цвета
    public getTypeInfo(){
        switch(this.color){
            case 'White':{
                return 'Деньги: $' + this.money 
            }
            case 'Green':{
                return ''
            }
            case 'Violet':{
                if(this.money != 0)
                    return 'Штраф: $' + this.money
                else
                    return 'Подписчики: ' + this.subs
            }
            case 'Orange':{
                return 'Подписчики: ' + this.subs
            }
        }

    }

    public getColor(){
        return this.color
    }

    public getAnalysisDots(){
        return '● '.repeat(this.CurrentAnalysis) + '○ '.repeat(this.TotalAnalysis-this.CurrentAnalysis)
    }
    public getDevDots(){
        return '● '.repeat(this.CurrentDevelopment) + '○ '.repeat(this.TotalDevelopment-this.CurrentDevelopment)
    }
    public getTestDots(){
        return '● '.repeat(this.CurrentTesting) + '○ '.repeat(this.TotalTesting-this.CurrentTesting)
    }

    updateStatus(){
        switch(this.status){
            case 'Selected':{
                this.status ='AnalProg'
                break
            }
            case 'AnalProg':{
                this.status ='AnalDone'
                break
            }
            case 'AnalDone':{
                this.status ='DevProg'
                break
            }
            case 'DevProg':{
                this.status ='DevDone'
                break
            }
            case 'DevDone':{
                this.status ='Test'
                break
            }
            case 'Test':{  
                this.status ='ReadyDeploy'
                break
            }
            case 'ReadyDeploy':{
                this.status ='Deploy'
                break
            }
            default:
                return
        }
    }
}
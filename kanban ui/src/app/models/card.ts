
export class card{
    
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
    status: number
    priority: number
    email: string

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

    constructor(name,begdate,enddate,currentdev,totaldev,curentanal,totalanal,currenttest,totaltest,money,subs,color,status,priority){
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
    }
    // ngOnInit(): void {
    //     this.CardName = 'S1'
    //     this.DateBegSession = 2
    //     this.CurrentAnalysis = 4
    //     this.TotalAnalysis = 20
    //     this.CurrentDevelopment = 0
    //     this.TotalDevelopment = 15
    //     this.CurrentTesting = 0
    //     this.TotalTesting = 10
    //     this.money = 1000
    //     this.subs = 10
    //     this.color = 2
    //     this.status = 'selected'
    //     this.priority = 0
    // }

    //Функция возвращает информацию для
    //правого верхнего угла карты в зависимости от ее цвета
    public getTypeInfo(){
        switch(this.color){
            case 'White':{
                return 'Cash: $' + this.money 
            }
            case 'Green':{
                return ''
            }
            case 'Violet':{
                return 'Fine: ' + this.money
            }
            case 'Orange':{
                return 'Subs: ' + this.subs
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
}
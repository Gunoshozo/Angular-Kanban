export class GameTable{
    public tableId:number;    
    public nameGameTable:string;
    public usersCount: number;


    constructor(id,name,count){
        this.tableId = id;
        this.nameGameTable = name;
        this.usersCount = count;
    }
}
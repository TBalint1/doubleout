export interface ITest {
    type:string
    count:number
    question:boolean
    answer:string
    bot:Bot[]
}

export interface Bot {
    name:string
}
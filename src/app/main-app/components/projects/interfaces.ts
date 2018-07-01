export interface IProjects {
    list:[{
    _id:string,
    addedDiff:string,
    budget:{currency:string,value:string},
    deadline:string,
    description:string,
    title:string
    }],
    length:number
}


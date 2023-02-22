export interface Cart {
    [x: string]: any;
    Name:string,
    Price:number,
    Color:string,
    Category:string,
    Desciption:string,
    Image:string,
    id:number | undefined,
    Quantity:undefined | number,
    userId:number,
    ProductId:number
}

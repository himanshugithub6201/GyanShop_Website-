export class Cart{
    items? :CartItem[];
}

export class CartItem{
    productId?:string;
    quantity?:any;
}

export class cartItemDetailed{
    
    product?:any;
    quantity?:number
}
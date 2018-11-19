class Order {
    constructor(
        public address: string, 
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrdemItem[] = []
    
    ){}
}

class OrdemItem {
    constructor(public quantity: number, public menuId: string){}
}

export {Order, OrdemItem}
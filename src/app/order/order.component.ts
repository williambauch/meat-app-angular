import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart.item.model';
import { Order, OrdemItem } from './order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit() {
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }
  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item)
  }
  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item)
  }
  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems()
      .map((item:CartItem)=> new OrdemItem(item.quantity, item.menuItem.id))
     this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
          this.router.navigate(['/order-summary'])
          this.orderService.clear()
     }) 

    console.log(order)
  }

}

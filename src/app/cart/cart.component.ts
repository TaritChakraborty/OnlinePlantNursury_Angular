import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Order } from '../order';
import { Seed } from '../seed';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  seedSum: number;
  plantSum: number;
  planterSum: number;

  seedTotal: number
  plantTotal: number
  planterTotal: number
  totalPrice: number

  seedItems = this.cartService.getSeedItems();
  plantItems = this.cartService.getPlantItems();
  planterItems = this.cartService.getPlanterItems();

  seedItemQuantity: number = 1;
  plantItemQuantity: number = 1;
  planterItemQuantity: number = 1;

  order = {} as Order;
  constructor(private cartService: CartService) {
    if (this.seedItems.length != 0)
      this.seedSum = this.seedItems[0].seedsCost;
    else
      this.seedSum = 0;

    if (this.planterItems.length != 0)
      this.planterSum = this.planterItems[0].planterCost;
    else
      this.planterSum = 0;

    if (this.plantItems.length != 0)
      this.plantSum = this.plantItems[0].plantCost;
    else
      this.plantSum = 0;

    this.seedTotal = this.seedSum * this.seedItems.length;
    this.plantTotal = this.plantSum * this.plantItems.length;
    this.planterTotal = this.planterSum * this.planterItems.length;
    this.totalPrice = this.seedTotal + this.plantTotal + this.planterTotal;
  }
  ngOnInit() {


  }

  updateSeedSum(event): void {
    if (this.seedItems.length != 0) {
      this.seedSum = this.seedItems
        .map(x => x.seedsCost)
        .reduce((a, b) => {
          return a + b;
        });
      //  this.seedTotal = this.seedSum * this.seedItems.length;
    }
    else
      this.seedSum = 0

    this.seedItemQuantity = event.target.value
    this.seedTotal = this.seedSum * this.seedItemQuantity;
    //this.seedItemQuantity = event.target.value;
    this.updateTotalPrice();
  }
  updatePlantSum(event): void {
    if (this.plantItems.length != 0) {
      this.plantSum = this.plantItems
        .map(x => x.plantCost)
        .reduce((a, b) => {
          return a + b;
        });
      //  this.plantTotal = this.plantSum * this.plantItems.length;
    }
    else
      this.plantSum = 0

    this.plantItemQuantity = event.target.value;
    this.plantTotal = this.plantSum * this.plantItemQuantity;
    this.updateTotalPrice();
  }
  updatePlanterSum(event): void {
    if (this.planterItems.length != 0) {
      this.planterSum = this.planterItems
        .map(x => x.planterCost)
        .reduce((a, b) => {
          return a + b;
        });

      //  this.planterTotal = this.planterSum * this.planterItems.length;
    }
    else
      this.planterSum = 0

    this.planterItemQuantity = event.target.value;
    this.planterTotal = this.planterSum * this.planterItemQuantity;
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = this.seedTotal + this.plantTotal + this.planterTotal;

  }

  onClickCheckout(): void {
    console.log("cart compo" + this.plantItemQuantity);
    this.order.plantQuantity = this.plantItemQuantity;
    this.order.planterQuantity = this.planterItemQuantity;
    this.order.seedQuantity = this.seedItemQuantity;
    this.order.totalCost = this.totalPrice;
    // this.order.bookingOrderId = 1;
    // this.order.customer = 5;
    // this.order.orderDate='';
    this.order.plant = this.plantItems;
    this.order.seed = this.seedItems;
    this.order.planters = this.planterItems;
    this.order.quantity = 4;
    // this.order.transactionMode = "";

    this.cartService.onClickCheckout(this.order);
  }


}

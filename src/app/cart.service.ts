import { Injectable } from '@angular/core';
import { Order } from './order';
import { OrderService } from './order.service';
import { OrderComponent } from './order/order.component';
import { Plant } from './plant';
import { Planter } from './planter';
import { Seed } from './seed';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  seedItems: Seed[] = [];
  plantItems: Plant[] = [];
  planterItems: Planter[] = [];

  seedSum: number = 1;
  plantSum: number = 1;
  planterSum: number = 1;

  seedTotal: number = 1;
  plantTotal: number = 1;
  planterTotal: number = 1;
  totalPrice: number = 1;

  seedItemQuantity: number = 1;
  plantItemQuantity: number = 1;
  planterItemQuantity: number = 1;

  order = {} as Order;

  constructor(private orderService: OrderService) { }


  /*.......Seed............... */
  addSeedToCart(seed: Seed) {
    this.seedItems.push(seed);
    console.log("cart service: ", this.seedItems)
  }
  getSeedItems() {
    return this.seedItems;
  }


  /*.......Plant............... */
  addPlantToCart(plant: Plant) {
    this.plantItems.push(plant);
  }
  getPlantItems() {
    return this.plantItems;
  }


  /*.......Planter............... */
  addPlanterToCart(planter: Planter) {
    this.planterItems.push(planter);
  }
  getPlanterItems() {
    return this.planterItems;
  }

  /*.......Common Operations............... */
  clearCart() {
    this.seedItems = [];
    this.plantItems = [];
    this.planterItems = [];

    this.getPlantItems();
    this.getPlanterItems();
    this.getSeedItems();
  }

  /*.......Order Operations............... */

  onClickCheckout(order: Order): void {

    if (order.seed.length != 0) { this.order.seedQuantity = order.seedQuantity }
    else { this.order.seedQuantity = 0 }

    if (order.plant.length != 0) { this.order.plantQuantity = order.plantQuantity }
    else { this.order.plantQuantity = 0 }

    if (order.planters.length != 0) { this.order.planterQuantity = order.planterQuantity }
    else { this.order.planterQuantity = 0 }

    this.order.totalCost = order.totalCost;
    this.order.planters = order.planters
    this.order.seed = order.seed;
    console.log("on checkout cart service", this.order.seed);
    this.order.plant = order.plant;
    console.log("cart Service" + this.order.plantQuantity);
    this.orderService.setOrder(this.order);
  }

}

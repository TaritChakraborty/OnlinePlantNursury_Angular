import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order = {} as Order;
  customer = {} as Customer;
  logCustomer = {} as Customer;
  radioSel: any;
  radioSelected: string;

  paymentOption = ["Card", " Cash"]
  constructor(private orderService: OrderService,
    private customerService: CustomerService,
    private cartService: CartService) {
    this.customerService.getCustomer(this.customerService.loggedCustomer.username,
      this.customerService.loggedCustomer.password)
      .subscribe(
        (response: Customer) => {
          this.logCustomer = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )


    this.customer.customerId = this.customerService.loggedCustomer.customerId;
    console.log("this.customer.customerId ->", this.customer.customerId)
    this.paymentOption = ["Card", " Cash"];
    this.radioSelected = "Cash";
    this.getSelecteditem();
  }
  getSelecteditem() {
    this.radioSel = this.paymentOption.find(Item => Item === this.radioSelected);
    console.log(this.radioSel)
  }

  onItemChange(item) {
    this.getSelecteditem();
  }

  ngOnInit(): void {
    this.getOrder();
    console.log("Loggin in orderComp, this.customerService.loggedCustomer.password -->" + this.customerService.loggedCustomer.password)

  }

  getOrder(): void {
    this.order = this.orderService.getOrder();
    console.log("order compo" + this.order.plantQuantity);
  }

  onConfirmOrder(): void {
    this.order.customer = this.customer;
    this.order.transactionMode = this.radioSel
    console.log("orderCom", this.order);
    this.orderService.addOrder(this.order).subscribe(
      (response: Order) => {
        console.log("Confirmed Order -->", response);
        alert("Order Successful")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    );
    this.cartService.clearCart();

  }

}

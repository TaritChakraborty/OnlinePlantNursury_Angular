import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Planter } from 'src/app/planter';
import { PlanterService } from 'src/app/planter.service';

@Component({
  selector: 'app-planter',
  templateUrl: './planter.component.html',
  styleUrls: ['./planter.component.css']
})
export class PlanterComponent implements OnInit {

  planters!: Planter[];
  constructor(private planterService: PlanterService,
    private cartService: CartService) { }


  ngOnInit(): void {
    this.getPlanters()
  }

  public getPlanters(): void {
    this.planterService.getPlanters().subscribe(
      (response: Planter[]) => {
        this.planters = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };
  addPlanterToCart(planter: Planter) {
    this.cartService.addPlanterToCart(planter);
    // window.alert('added');
  }
}

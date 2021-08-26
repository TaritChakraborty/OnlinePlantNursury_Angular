import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Seed } from 'src/app/seed';
import { SeedService } from 'src/app/seed.service';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.css']
})
export class SeedComponent implements OnInit {
  seeds!: Seed[];
  constructor(private seedService: SeedService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getSeeds();
  }

  public getSeeds(): void {
    this.seedService.getSeeds().subscribe(
      (response: Seed[]) => {
        this.seeds = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };
  addSeedToCart(seed: Seed) {
    console.log("Added")
    this.cartService.addSeedToCart(seed);
    // window.alert('added');
  }

}

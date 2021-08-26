import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Plant } from 'src/app/plant';
import { PlantService } from 'src/app/plant.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {

  plants!: Plant[];
  constructor(private plantService: PlantService,
    private cartService: CartService) { }


  ngOnInit(): void {
    this.getPlants()
  }

  public getPlants(): void {
    this.plantService.getPlants().subscribe(
      (response: Plant[]) => {
        this.plants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };
  addPlantToCart(plant: Plant) {
    this.cartService.addPlantToCart(plant);
    // window.alert('added');
  }

}

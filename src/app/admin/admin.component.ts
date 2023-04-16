import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../admin';
import { Customer } from '../customer';
import { Plant } from '../plant';
import { Planter } from '../planter';
import { Seed } from '../seed';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /*...........................Hiding variables......................................*/
  isCustomer: boolean = false;
  isPlanter: boolean = false;
  isPlant: boolean = false;
  isSeed: boolean = false;
  ifAddPlant: boolean = false;

  admin = {} as Admin;
  customers: Customer[] = [];
  plantList: Plant[] = [];
  planterList: Planter[] = [];
  seedList: Seed[] = [];

  public username: string = '';
  public password: string = '';
  constructor(private _adminservice: AdminService, private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.username = this._route.snapshot.params['username'];
    this.password = this._route.snapshot.params['password'];
    this._adminservice.getAdmin(this.username, this.password).subscribe(data => { this.admin = data });
  }

  log_out: String = '';
  logout() {
    this._adminservice.logout().subscribe(next => { this.log_out = next; console.log(this.log_out); },
      error => this._router.navigate(['/customer']))
  }

  /*.......................................Customer operations....................................*/
  customerObj = {} as Customer;
  isOrder: boolean = false;
  customer() {
    if (this.isCustomer == false) {
      this.isCustomer = true;
      this.isPlant = false;
      this.isPlanter = false;
      this.isSeed = false;
      this._adminservice.getCustomerList().subscribe(data => {
        this.customers = data;
        console.log(data);
      });
    }
    else {
      this.isCustomer = false;
    }
  }
  deleteCustomer(id: number) {
    this._adminservice.deleteCustomer(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

  viewOrder(id: number) {
    if (this.isOrder == false) {
      this._adminservice.getOrder(id).subscribe(data => {
        this.customerObj = data;
        this.isOrder = true;
        console.log(data)
      }
        , error => console.log(error));
    } else {
      this.isOrder = false;
    }
  }
  /*.....................................Plant Operations.............................................*/
  isButton: boolean = false;
  plant() {
    if (this.isPlant == false) {
      this.isPlant = true;
      this.isCustomer = false;
      this.isPlanter = false;
      this.isSeed = false;
      this._adminservice.getPlantList().subscribe(data => { this.plantList = data; console.log(data); })
    }
    else {
      this.isPlant = false;
    }
  }
  plantFormView() {
    if (this.ifAddPlant == false) {
      this.ifAddPlant = true;
      this.plantForm.reset();
    } else {
      this.ifAddPlant = false;
    }
  }
  clearPlant() {
    this.plantForm.reset();
  }

  plantForm = new UntypedFormGroup({
    plant1: new UntypedFormControl(''), plant2: new UntypedFormControl(''), plant3: new UntypedFormControl(''), plant4: new UntypedFormControl(''),
    plant5: new UntypedFormControl(''), plant6: new UntypedFormControl(''), plant7: new UntypedFormControl(''), plant8: new UntypedFormControl(''),
    plant9: new UntypedFormControl(''), plant10: new UntypedFormControl(''), plant11: new UntypedFormControl(''), plant12: new UntypedFormControl('')
  });

  plantObj = {} as Plant;
  addPlant() {
    this.plantObj.plantHeight = this.plantForm.controls.plant1.value;
    this.plantObj.plantSpread = this.plantForm.controls.plant2.value;
    this.plantObj.commonName = this.plantForm.controls.plant3.value;

    this.plantObj.bloomTime = this.plantForm.controls.plant4.value;
    this.plantObj.medicinalOrCulinaryUse = this.plantForm.controls.plant5.value;
    this.plantObj.difficultyLevel = this.plantForm.controls.plant6.value;
    this.plantObj.temparature = this.plantForm.controls.plant7.value;
    this.plantObj.typeOfPlant = this.plantForm.controls.plant8.value;
    this.plantObj.plantDescription = this.plantForm.controls.plant9.value;
    this.plantObj.plantsStock = this.plantForm.controls.plant10.value;
    this.plantObj.plantCost = this.plantForm.controls.plant11.value;
    this.plantObj.plantImageUrl = this.plantForm.controls.plant12.value;

    this._adminservice.createPlant(this.plantObj)
      .subscribe(data => { console.log(this.plantObj); window.location.reload(); },
        error => console.log(error));

  }
  check: boolean = true;
  plantNewObj = {} as Plant;
  plant21: number = 0;
  plant22: number = 0;
  updatePlant(id: number) {
    this._adminservice.getPlantById(id).subscribe(data => { this.plantNewObj = data }, error => console.log(error));
    this.plantNewObj.plantsStock = this.plant21;
    this.plantNewObj.plantCost = this.plant22;
    this._adminservice.updatePlant(id, this.plantNewObj).subscribe(data => {
      console.log(data);
      window.location.reload();
    }
      , error => console.log(error));

  }
  deletePlant(id: number) {
    this._adminservice.deletePlant(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }
  /*....................................Planter operations............................................*/
  ifAddPlanter: boolean = false;
  planter() {
    if (this.isPlanter == false) {
      this.isPlant = false;
      this.isCustomer = false;
      this.isPlanter = true;
      this.isSeed = false;
      this._adminservice.getPlanterList().subscribe(data => { this.planterList = data; console.log(data); })
    }
    else {
      this.isPlanter = false;
    }
  }
  clearPlanter() {
    this.planterForm.reset();
  }
  planterFormView() {
    if (this.ifAddPlanter == false) {
      this.ifAddPlanter = true;
      this.plantForm.reset();
    } else {
      this.ifAddPlanter = false;
    }
  }
  planterForm = new UntypedFormGroup({
    planter1: new UntypedFormControl(''), planter2: new UntypedFormControl(''), planter3: new UntypedFormControl(''),
    planter4: new UntypedFormControl(''), planter5: new UntypedFormControl(''), planter6: new UntypedFormControl(''),
    planter7: new UntypedFormControl(''), planter8: new UntypedFormControl('')
  });
  planterObj = {} as Planter;
  addPlanter() {
    this.planterObj.planterheight = this.planterForm.controls.planter1.value;
    this.planterObj.planterCapacity = this.planterForm.controls.planter2.value;
    this.planterObj.drinageHoles = this.planterForm.controls.planter3.value;
    this.planterObj.planterColor = this.planterForm.controls.planter4.value;

    this.planterObj.planterShape = this.planterForm.controls.planter5.value;
    this.planterObj.planterStock = this.planterForm.controls.planter6.value;
    this.planterObj.planterCost = this.planterForm.controls.planter7.value;
    this.planterObj.planterImageUrl = this.planterForm.controls.planter8.value;

    this._adminservice.createPlanter(this.planterObj)
      .subscribe(data => { console.log(this.planterObj); window.location.reload(); },
        error => console.log(error));
  }

  deletePlanter(id: number) {
    this._adminservice.deletePlanter(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }


  /*....................................Seed operations..............................................*/
  ifAddSeed: boolean = false;
  seed() {
    if (this.isSeed == false) {
      this.isPlant = false;
      this.isCustomer = false;
      this.isPlanter = false;
      this.isSeed = true;
      this._adminservice.getSeedList().subscribe(data => { this.seedList = data; console.log(data); })
    }
    else {
      this.isSeed = false;
    }
  }
  clearSeed() {
    this.seedForm.reset();
  }
  seedFormView() {
    if (this.ifAddSeed == false) {
      this.ifAddSeed = true;
      this.seedForm.reset();
    } else {
      this.ifAddSeed = false;
    }
  }
  seedForm = new UntypedFormGroup({
    seed1: new UntypedFormControl(''), seed2: new UntypedFormControl(''), seed3: new UntypedFormControl(''),
    seed4: new UntypedFormControl(''), seed5: new UntypedFormControl(''), seed6: new UntypedFormControl(''),
    seed7: new UntypedFormControl(''), seed8: new UntypedFormControl(''), seed9: new UntypedFormControl(''),
    seed10: new UntypedFormControl(''), seed11: new UntypedFormControl('')
  });
  seedObj = {} as Seed;
  addSeed() {
    this.seedObj.commonName = this.seedForm.controls.seed1.value;
    this.seedObj.bloomTime = this.seedForm.controls.seed2.value;
    this.seedObj.watering = this.seedForm.controls.seed3.value;
    this.seedObj.difficultyLevel = this.seedForm.controls.seed4.value;
    this.seedObj.temparature = this.seedForm.controls.seed5.value;
    this.seedObj.typeOfSeeds = this.seedForm.controls.seed6.value;

    this.seedObj.seedsDescription = this.seedForm.controls.seed7.value;
    this.seedObj.seedsStock = this.seedForm.controls.seed8.value;
    this.seedObj.seedsCost = this.seedForm.controls.seed9.value;
    this.seedObj.seedsPerPacket = this.seedForm.controls.seed10.value;
    this.seedObj.seedImageUrl = this.seedForm.controls.seed11.value;

    this._adminservice.createSeed(this.seedObj)
      .subscribe(data => { console.log(this.seedObj); window.location.reload(); },
        error => console.log(error));
  }

  deleteSeed(id: number) {
    this._adminservice.deleteSeed(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

}




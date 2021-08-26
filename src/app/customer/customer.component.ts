import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../admin';
import { AdminService } from '../admin/admin.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customerUsername = '';
  public customerPassword = '';
  public customer!: Customer;
  /////////////ADMIN////////////////////
  public adminUsername = '';
  public adminPassword = '';
  public admin = {} as Admin;


  public isShown: boolean = false;
  constructor(private _customerservice: CustomerService,
    private _adminservice: AdminService, private _router: Router) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.customerUsername = this.loginForm.controls.username.value;
    this.customerPassword = this.loginForm.controls.password.value;

    this._customerservice.validateCustomer(this.customerUsername, this.customerPassword).subscribe(
      data => { this._router.navigate(['/home', this.customerUsername, this.customerPassword],{skipLocationChange: true}) }
      , error => this.isShown = true);
    }

  ///////////////////////ADMIN//////////////////////////////
  isAdminShown: boolean = false;
  onAdminSubmit() {
    this.adminUsername = this.loginForm.controls.username.value;
    this.adminPassword = this.loginForm.controls.password.value;

    this._adminservice.validateAdmin(this.adminUsername, this.adminPassword).subscribe(
      data => { this._router.navigate(['/admin-home', this.adminUsername, this.adminPassword]) }
      , error => this.isAdminShown = true);
  }
  ///////////////////////ADMIN//////////////////////////////

}

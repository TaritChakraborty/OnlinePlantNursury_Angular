import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/address';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private _customerService: CustomerService,
    private _router: Router) { }
  customer = {} as Customer;
  address = {} as Address;
  submitted = false;
  isShown: boolean = false;

  ngOnInit(): void {
    this.submitted = false;
  }

  customerForm = new FormGroup({
    first: new FormControl(''), middle: new FormControl(''), last: new FormControl(''),
    email: new FormControl(''), username: new FormControl(''),
    password: new FormControl(''), confirm: new FormControl(''),
    house: new FormControl(''), colony: new FormControl(''), city: new FormControl(''),
    state: new FormControl(''), pin: new FormControl('')
  });

  onSubmit() {
    this.customer.customerName = this.customerForm.controls.first.value + this.customerForm.controls.middle.value
      + this.customerForm.controls.last.value;
    this.customer.customerEmail = this.customerForm.controls.email.value;
    this.customer.username = this.customerForm.controls.username.value;
    this.customer.password = this.customerForm.controls.password.value;

    this.address.houseNo = this.customerForm.controls.house.value;
    this.address.colony = this.customerForm.controls.colony.value;
    this.address.city = this.customerForm.controls.city.value;
    this.address.state = this.customerForm.controls.state.value;
    this.address.pincode = this.customerForm.controls.pin.value;
    this.customer.address = this.address;

    if (this.customerForm.controls.password.value == this.customerForm.controls.confirm.value) {
      this.submitted = true;
      this._customerService.addCustomer(this.customer)
        .subscribe(data => {
          console.log(this.customer); this._router.navigate(['/customer']);
        },
          error => console.log(error));

    } else {
      this.customerForm.reset();
      this.isShown = true;
    }

  }


  addStudentForm() {
    this.submitted = false;
    this.customerForm.reset();
  }

}

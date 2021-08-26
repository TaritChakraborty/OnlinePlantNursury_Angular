import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/address';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/customer.service';
import { Order } from 'src/app/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  closeResult: string = "";
  constructor(private _cservice: CustomerService,
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _router: Router) { }

  public customer = {} as Customer;
  public customer_obj = {} as Customer;
  public username: string = '';
  public password: string = '';
  public check: boolean = true;
  public check1: boolean = true;
  public isShown: boolean = false;
  public isView: boolean = false;

  house!: string; colony!: string; city!: string;
  state!: string; pincode!: number;
  address = {} as Address;
  custId: number = 0;



  /*............................For Updating Address...............................*/

  lastorder = {} as Order;

  ngOnInit() {
    this.username = this._route.snapshot.params['username'];
    this.password = this._route.snapshot.params['password'];
    this._cservice.getCustomer(this.username, this.password)
      .subscribe(data => {
        this.customer = data;
        this.custId = this.customer.customerId
        this.house = this.customer.address.houseNo;
        this.colony = this.customer.address.colony;
        this.city = this.customer.address.city;
        this.state = this.customer.address.state;
        this.pincode = this.customer.address.pincode;
        this.customer_obj = this.customer;
        this.initialiseServiceCustomer(this.customer);
      },
        error => console.log(error));



  }
  loggerCustomer = this.customer;
  initialiseServiceCustomer(customer: Customer): void {


    // this._cservice.getCustomer(username, password).subscribe(data => {this.loggerCustomer = data;}, error => console.log(error)); 
    console.log("profile logger", customer)
    this._cservice.loggedCustomer.username = customer.username;
    this._cservice.loggedCustomer.password = customer.password;
    this._cservice.loggedCustomer.customerId = customer.customerId

  }

  //...........................Function for updating address.....................................

  update() {
    this.address.houseNo = this.house;
    this.address.colony = this.colony;
    this.address.city = this.city;
    this.address.state = this.state;
    this.address.pincode = this.pincode;
    this._cservice.updateAddress(this.address)
      .subscribe(data => { window.location.reload(); console.log(data); }, error => console.log(error));
  }

  activate() {
    if (this.check == false) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
  toggleview() {
    this.isView = !this.isView;
    this._cservice.getLastOrder().subscribe(data => { this.lastorder = data; 
                                                      console.log(data); }, error => console.log(error));
  }

  activate1() {
    if (this.check1 == false) {
      this.check1 = true;
    } else {
      this.check1 = false;
    }
  }

  /*................................  Logic for pop-up form...............................................*/
  open(content: any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-fade' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }
  /*......................................Logic ends......................................................*/
  order() {
    this._cservice.getOrders().subscribe(data => { this.customer = data; }, error => console.log(error));
  }

  /*......................................Update password.................................................*/
  change_password = new FormControl
    ('');
  confirm_password = new FormControl('');
  isDialogShown: boolean = false;
  updatePassword() {
    if (this.change_password.value == this.confirm_password.value) {
      this.customer_obj.password = this.change_password.value;
      this._cservice.updatePassword(this.customer_obj).subscribe(data => console.log(this.customer_obj),
        error => console.log(this.change_password));
    } else {
      this.isDialogShown = true;
    }

  }

  /*.........................................Logout.......................................................*/
  log_out!: String;
  logout() {
    this._cservice.logout().subscribe(next => { this.log_out = next; console.log(this.log_out); },
      error => this._router.navigate(['/customer']))
  }

  /*.........................................Profile......................................................*/
  deleteCustomer() {
    this._cservice.deleteCustomer().subscribe(data => {
      console.log(data);
      this._router.navigate(['/customer']);
    },
      error => console.log(error));
  }

}

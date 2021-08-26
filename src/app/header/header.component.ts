import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _cservice: CustomerService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  customerUsername: string = this._cservice.loggedCustomer.username;
  customerPassword: string = this._cservice.loggedCustomer.password;
  ngOnInit(): void {
  }
  log_out!: String;
  logout() {
    this._cservice.logout().subscribe(next => { this.log_out = next; console.log(this.log_out); },
      error => this._router.navigate(['/customer']))
  }

  profileRedirect(): void {
    console.log("Redirect", this._cservice.loggedCustomer, this.customerUsername)
    this._router.navigate(['/home', this._cservice.loggedCustomer.username, this._cservice.loggedCustomer.password])
  }
}

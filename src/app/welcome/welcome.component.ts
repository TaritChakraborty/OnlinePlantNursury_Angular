import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
  
})
export class WelcomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/customer']);
  }, 6000);  //5s
  }

}

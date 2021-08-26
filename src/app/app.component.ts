import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlinePlantNursery';
  showHead: boolean = false;

  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/customer') {
          this.showHead = false;
        }
        else if (event['url'] == '/add-customer') {
          this.showHead = false;
        }
        else if (event['url'] == '/welcome') {
          this.showHead = false;
        }
        else if (event['url'] == '/') {
          this.showHead = false;
        }
        else if (event['url'] == '/admin-home/admin123/3Password') {
          this.showHead = false;
        }
        else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }
}

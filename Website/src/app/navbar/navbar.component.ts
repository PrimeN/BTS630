import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public token: any;
  public emailVerification: boolean = null;
  public sent: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.sent = false;
  }

  ngOnInit() {

    //Display additional routes if authenticated
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.isAuthenticated();
        if (this.token) {
          //Display header if email isnot verified
          if (this.auth.isEmailVerified()) {
            this.emailVerification = true;
          }else{
            this.emailVerification = false;
          }
        }
      }
    });


  }

  resendEmail() {
    this.auth.resendEmail().subscribe((data) => this.sent = data);
  }

}

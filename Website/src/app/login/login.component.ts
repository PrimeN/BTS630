import { Component, OnInit } from '@angular/core';
import { Credentials } from '../models'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // Properties
  credentials: Credentials;
  loginError: string;

  // Initialization
  constructor(private router: Router, private auth: AuthService, private jwtHelper: JwtHelperService) {
    this.credentials = new Credentials();
    this.credentials.Email = '';
    this.credentials.password = '';

    this.loginError = '';
  }

  ngOnInit() {
  }


  onSubmit(f: NgForm): void {

    this.credentials.Email = this.credentials.Email.toLowerCase();

    this.auth.login(this.credentials).subscribe(
      () => {
        
        // redirect to the home route
        this.router.navigate(['/home']);
      },
      (err) => {
        this.loginError = err.error.message;
      }
    );

  }
}


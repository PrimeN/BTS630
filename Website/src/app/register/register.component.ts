import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  use: User;
  pass1: string;
  pass2: string;
  registerError: string;

  constructor(private router: Router, private auth: AuthService, private jwtHelper: JwtHelperService){
    this.use = new User();
    this.pass1 = '';
    this.pass2 = '';
  }

  ngOnInit() {
  }

  onSubmit(p1: string, p2: string, f: NgForm): void {

    this.registerError = '';
    if (p1 != p2) {
      this.registerError = 'Passwords do not match!';
    } else if (p1.length > 12 || p1.length < 8) {
      this.registerError += 'Password length should be between 8 - 12';
    }


    //Modification for access reasons
    this.use.Email = this.use.Email.toLowerCase();

    this.auth.register(this.use).subscribe(
      (success) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        this.registerError = err.error.message;
      }
    );

  }

}

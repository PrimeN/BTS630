import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  Email: string;
  response: string;

  constructor(private auth: AuthService) {
    this.response = "";
    this.Email = "";
  }

  onSubmit(f: NgForm): void {

    console.log("sent");

    if (this.Email !== "") {
      this.auth.sendPassReset(this.Email.toLowerCase()).subscribe(
        () => {
          this.response = "A password reset link has been sent! You should recieve it shortly.";
          this.Email = "";
        },
        (err) => {
          this.response = err;
        }
      );
    }else{
      this.response = "Please enter an email.";
    }

  }

  ngOnInit() {
  }

}

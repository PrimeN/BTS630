import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  private newPassword: string;
  private reenteredPassword: string;
  token: string;
  success: boolean = null;

  constructor(private route: ActivatedRoute, private auth: AuthService) {
    this.newPassword = '';
    this.reenteredPassword = '';
    // Extract the parameter from the URL
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit() {
  }


  updatePassword() {
    if (this.newPassword != this.reenteredPassword) {
      return false;
    } else {
      this.auth.updateForgottenPassword(this.token, this.newPassword, this.reenteredPassword).subscribe(data => this.success = data);
    }
  }
}

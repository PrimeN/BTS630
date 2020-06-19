import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { DataManagerService } from "../data-manager.service";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  use: User;
  private id: string;
  success: boolean = null;
  private newPassword: string;
  private reenteredPassword: string;

  constructor(private route: ActivatedRoute, private dataService: DataManagerService, private router: Router, private auth: AuthService) {
    this.id = this.auth.readToken()._id;
    this.newPassword = '';
    this.reenteredPassword = '';
  }

  ngOnInit(): void {
    this.dataService.viewLog('Employee Updates loaded');
    this.getUser();
  }

  getUser(): void {
    this.dataService.getUser(this.id).subscribe(user => this.use = user);
  }


  updateUser(): void {
    //No network checking assuming errors don't occur (Will update after deciding on error code)
    this.dataService.updateUser(this.use).subscribe();
    this.router.navigate(["/profile"]);
  }

  updatePassword() {
    if (this.newPassword != this.reenteredPassword) {
      return false;
    } else {
      this.dataService.updatePassword(this.id, this.newPassword, this.reenteredPassword).subscribe(data => this.success = data);
    }
  }

}

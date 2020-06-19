import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataManagerService } from '../data-manager.service';
import { AuthService } from '../auth.service';
import { User, Role } from '../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  use: User;
  private id: string;

  constructor(private route: ActivatedRoute, private dataService: DataManagerService, private location: Location, private auth: AuthService) {
    this.id = this.auth.readToken()._id;
  }

  ngOnInit(): void {
    this.dataService.viewLog('Employee Updates loaded');
    this.getUser();
  }

  getUser(): void {
    this.dataService.getUser(this.id).subscribe(user => this.use = user);
  }

  goBack(): void {
    this.location.back();
  }

}

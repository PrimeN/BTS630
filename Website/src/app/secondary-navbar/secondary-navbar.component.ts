import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.css']
})
export class SecondaryNavbarComponent implements OnInit {

  public token: any;

  constructor(private manager: DataManagerService, private auth: AuthService) {
    this.token = false;
  }

  ngOnInit() {
    this.manager.isAdmin(this.auth.readToken()._id).subscribe(val => this.token = val);
  }

}

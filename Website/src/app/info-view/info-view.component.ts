import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User, Role } from '../models';
import { DataManagerService } from "../data-manager.service";
import { AuthService } from '../auth.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.css']
})
export class InfoViewComponent implements OnInit {
  @ViewChild('content')
  content: TemplateRef<any>;

  volunteerFilter: User[];
  roles: Role[];
  search = "";
  options = 3;
  use: User;
  selectedUser

  constructor(private modalService: NgbModal, private dataService: DataManagerService, private auth: AuthService) {
  }

  ngOnInit(): void {
    //Get all of the users
    this.dataService.getRoles().subscribe(value => this.roles = value);
    this.dataService.getUsers().subscribe(value => this.volunteerFilter = value);
  }


  UpdateUserRequest(volunteer) {
    this.use = volunteer;
    this.modalService.open(this.content, { size: 'lg', centered: true });
    volunteer.isActive = this.use.isActive;
    volunteer.TotalHoursVolunteered = this.use.TotalHoursVolunteered;
    volunteer.Role.RoleName = this.use.Role.RoleName;
    
  }


  UpdateUser() {
    this.dataService.updateUserContact(this.use).subscribe(message => {
      if (message) {
        this.modalService.dismissAll();
      }
    });
    this.use = null;
  }

}

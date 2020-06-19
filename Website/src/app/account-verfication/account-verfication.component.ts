import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account-verfication',
  templateUrl: './account-verfication.component.html',
  styleUrls: ['./account-verfication.component.css']
})
export class AccountVerficationComponent implements OnInit {

  activated:boolean;

  constructor(private route: ActivatedRoute, private auth: AuthService) { 
    this.activated = true;
  }

  ngOnInit() {

    // Extract the parameter from the URL
    let token = this.route.snapshot.params['token'];

    // Display message according to teh value
    this.auth.accountVerification(token).subscribe((data) => this.activated = data);
  }

}

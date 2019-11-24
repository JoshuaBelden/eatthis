import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  authenticatedUser: AuthenticatedUser;

  constructor(authService: AuthService) {
    this.authenticatedUser = authService.getAuthenticatedUser();
  }

  ngOnInit() {
  }
}

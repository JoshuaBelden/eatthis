import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  authenticatedUser: AuthenticatedUser;

  constructor(private authService: AuthService) {
    this.isLoggedIn = authService.isUserLoggedIn();
    this.authenticatedUser = authService.getAuthenticatedUser();
  }

  ngOnInit() {
  }

}

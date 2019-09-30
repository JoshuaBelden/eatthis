import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  authenticatedUser: AuthenticatedUser;

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationService) {
    this.isLoggedIn = authService.isUserLoggedIn();
    this.authenticatedUser = authService.getAuthenticatedUser();

    this.notificationsService.onUserLoggedIn.subscribe(user => {
      this.isLoggedIn = authService.isUserLoggedIn();
      this.authenticatedUser = authService.getAuthenticatedUser();
    });

    this.notificationsService.onUserLoggedOut.subscribe(() => {
      this.isLoggedIn = authService.isUserLoggedIn();
      this.authenticatedUser = authService.getAuthenticatedUser();
    });
  }

  ngOnInit() {
  }

}

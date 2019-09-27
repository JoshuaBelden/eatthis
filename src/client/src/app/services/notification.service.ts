import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthenticatedUser } from '../models/authenticatedUser';

@Injectable()
export class NotificationService {
  private userLoggedInEvent = new Subject<AuthenticatedUser>();
  private userLoggedOutEvent = new Subject();

  onUserLoggedIn = this.userLoggedInEvent.asObservable();
  onUserLoggedOut = this.userLoggedOutEvent.asObservable();

  emitUserLoggedIn(authenticatedUser: AuthenticatedUser) {
    this.userLoggedInEvent.next(authenticatedUser);
  }

  emitUserLoggedOut() {
    this.userLoggedOutEvent.next();
  }
}

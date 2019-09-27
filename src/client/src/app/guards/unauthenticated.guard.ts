import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class UnauthenticatedGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserLoggedIn = this.authService.isUserLoggedIn();
    if (isUserLoggedIn) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}

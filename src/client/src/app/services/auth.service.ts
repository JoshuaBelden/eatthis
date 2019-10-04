import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { NotificationService } from './notification.service';
import { AuthenticatedUser } from '../models/authenticatedUser';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private accountNotification: NotificationService
  ) { }

  isUserLoggedIn() {
    return this.getAuthToken() !== null;
  }

  getAuthToken() {
    return sessionStorage.getItem('auth-token');
  }

  checkAuthentication() {
    if (!this.isUserLoggedIn()) {
      this.accountNotification.emitUserLoggedOut();
      return;
    }

    this.accountNotification.emitUserLoggedIn(this.getAuthenticatedUser());
  }

  async login(email: string, password: string) {
    const response = await this.http.post<any>(`${environment.apiEndpoint}/account/login`, {
      email,
      password
    }).toPromise();

    this.storeAuthenticatedUser(response);
    this.accountNotification.emitUserLoggedIn(this.getAuthenticatedUser());
    return response.success;
  }

  logout() {
    this.removeAuthenticatedUser();
    this.accountNotification.emitUserLoggedOut();
  }

  async createAccount(firstName: string, lastName: string, email: string, password: string) {
    const response = await this.http.post<any>(`${environment.apiEndpoint}/account/register`, {
      firstName,
      lastName,
      email,
      password
    }).toPromise();

    this.storeAuthenticatedUser(response);
    this.accountNotification.emitUserLoggedIn(this.getAuthenticatedUser());
    return response.success;
  }

  getAuthenticatedUser() {
    return new AuthenticatedUser(
      sessionStorage.getItem('user-first-name'),
      sessionStorage.getItem('user-last-name'),
      sessionStorage.getItem('user-email')
    );
  }

  private storeAuthenticatedUser(response) {
    sessionStorage.setItem('auth-token', response.token);
    sessionStorage.setItem('user-first-name', response.firstName);
    sessionStorage.setItem('user-last-name', response.lastName);
    sessionStorage.setItem('user-email', response.email);
  }

  private removeAuthenticatedUser() {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('user-first-name');
    sessionStorage.removeItem('user-last-name');
    sessionStorage.removeItem('user-email');
  }
}

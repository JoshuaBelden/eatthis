import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser = new LoginUser();
  errors: string[] = [];

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  async login(form: NgForm) {
    try {
      await this.authService.login(this.loginUser.email, this.loginUser.password);
      this.router.navigate(['/']);
    } catch (error) {
      if (error.status === 401) {
        this.errors.push('That username or password is incorrect.');
      }
    }
  }
}

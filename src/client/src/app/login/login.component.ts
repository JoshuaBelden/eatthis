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
  errors: string[];

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  async login(form: NgForm) {
    try {
      const response = await this.authService.login(this.loginUser.email, this.loginUser.password);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }
}

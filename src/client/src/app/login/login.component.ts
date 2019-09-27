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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.authService
      .login(this.loginUser.email, this.loginUser.password)
      .subscribe(
        response => {
          this.router.navigateByUrl('/');
        },
        error => {
          // todo: See if we can consolidate where the backend service is putting errors vs the http error codes from the request.
          if (error.error) {
            if (error.error.status === 401) {
              this.errors.push('Username or password is invalid.');
            } else {
              this.errors.push(error.error.title);
            }
          }
          if (error.errors) {
            this.errors = error.errors.map(e => e.description);
          }
        }
      );
  }

}

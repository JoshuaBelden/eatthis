import { Component, OnInit } from '@angular/core';
import { Registration } from '../models/registration';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registration = new Registration();
  errors: string[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    try {
    const response = this.authService
      .createAccount(this.registration.firstName, this.registration.lastName, this.registration.email, this.registration.password);

    this.router.navigateByUrl('/');
    } catch (error) {
      console.log(error);
    }
  }
}

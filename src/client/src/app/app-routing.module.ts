import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'recipes',
    component: RecipeListComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [UnauthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

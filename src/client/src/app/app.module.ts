import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthInterceptorService } from './services/authInterceptor.service';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationService } from './services/notification.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { RegisterComponent } from './register/register.component';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { IngredientParser } from './services/ingredientParser.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AccountComponent,
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    NavigationComponent,
    RecipeListComponent,
    RegisterComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    AuthenticatedGuard,
    AuthService,
    RecipeService,
    IngredientParser,
    NotificationService,
    UnauthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

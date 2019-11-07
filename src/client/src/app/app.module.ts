import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthInterceptorService } from './services/authInterceptor.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryService } from './services/grocery.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { MealService } from './services/meal.service';
import { MomentPipe } from './pipes/moment.pipe';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationService } from './services/notification.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { RegisterComponent } from './register/register.component';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { SettingsCommonItemsComponent } from './settings-common-items/settings-common-items.component';
import { CommonItemsService } from './services/comonItems.service';

@NgModule({
  declarations: [
    AccountComponent,
    AppComponent,
    DashboardComponent,
    GroceryListComponent,
    LoginComponent,
    LogoutComponent,
    MealPlannerComponent,
    MomentPipe,
    NavigationComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeListComponent,
    RegisterComponent,
    SettingsCommonItemsComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    NgbModule,
    NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgDragDropModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    AuthenticatedGuard,
    AuthService,
    CommonItemsService,
    GroceryService,
    MealService,
    RecipeService,
    NotificationService,
    UnauthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

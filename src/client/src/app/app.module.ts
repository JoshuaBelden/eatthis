import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NgDragDropModule } from 'ng-drag-drop';

import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthInterceptorService } from './services/authInterceptor.service';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngredientParser } from './services/ingredientParser.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { MealService } from './services/meal.service';
import { NavigationComponent } from './navigation/navigation.component';
import { NotificationService } from './services/notification.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { RegisterComponent } from './register/register.component';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';

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
    MealPlannerComponent,
    GroceryListComponent,
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
    NgDragDropModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    AuthenticatedGuard,
    AuthService,
    MealService,
    RecipeService,
    IngredientParser,
    NotificationService,
    UnauthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

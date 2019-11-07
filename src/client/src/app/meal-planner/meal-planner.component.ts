import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Router } from '@angular/router';

import { GroceryService } from '../services/grocery.service';
import { Meal } from '../models/meal';
import { MealService } from '../services/meal.service';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit {

  allRecipes: Array<Recipe>;
  displayedRecipes: Array<Recipe>;
  meals: Array<any>;
  today = Moment().startOf('day');
  selectedDate = Moment();
  startOfWeek;
  weeks;

  constructor(
    private recipeService: RecipeService,
    private mealService: MealService,
    private groceryService: GroceryService,
    private router: Router) {
  }

  async ngOnInit() {
    this.allRecipes = await this.recipeService.getForUserAsync();
    this.selectToday();
  }

  async search(keyword) {
    if (!keyword) {
      this.displayedRecipes = this.allRecipes;
      return;
    } else {
      const expression = new RegExp(keyword, 'i');
      this.displayedRecipes = this.allRecipes.filter(recipe => recipe.title.match(expression));
    }
  }

  async selectToday() {
    this.selectedDate = Moment().startOf('month');
    this.meals = await this.getMeals(this.selectedDate, Moment(this.selectedDate).add(5, 'weeks'));
    this.buildCalendar(this.selectedDate, this.meals);
    console.log(this.weeks);
  }

  async selectNextMonth() {
    this.selectedDate = Moment(this.selectedDate).add(1, 'month');
    this.meals = await this.getMeals(this.selectedDate, Moment(this.selectedDate).add(5, 'weeks'));
    this.buildCalendar(this.selectedDate, this.meals);
  }

  async selectPreviousMonth() {
    this.selectedDate = Moment(this.selectedDate).subtract(1, 'month');
    this.meals = await this.getMeals(this.selectedDate, Moment(this.selectedDate).add(5, 'weeks'));
    this.buildCalendar(this.selectedDate, this.meals);
  }

  buildCalendar(startDate, meals: Array<Meal>) {
    this.startOfWeek = Moment(startDate).startOf('isoWeek');
    this.weeks = this.buildWeeks(this.startOfWeek, meals);
  }

  buildWeeks(startDate, meals: Array<Meal>) {
    return [
      this.addWeek(startDate, meals),
      this.addWeek(Moment(startDate).add(1, 'week'), meals),
      this.addWeek(Moment(startDate).add(2, 'week'), meals),
      this.addWeek(Moment(startDate).add(3, 'week'), meals),
      this.addWeek(Moment(startDate).add(4, 'week'), meals),
      this.addWeek(Moment(startDate).add(5, 'week'), meals),
    ];
  }

  addWeek(startDate, meals: Array<Meal>) {
    const monday = Moment(startDate);
    const tuesday = Moment(startDate).add(1, 'days');
    const wednesday = Moment(startDate).add(2, 'days');
    const thursday = Moment(startDate).add(3, 'days');
    const friday = Moment(startDate).add(4, 'days');
    const saturday = Moment(startDate).add(5, 'days');
    const sunday = Moment(startDate).add(6, 'days');

    return {
      monday: {
        occurs: monday,
        meals: meals.filter(m => monday.isSame(m.occurs))
      },
      tuesday: {
        occurs: tuesday,
        meals: meals.filter(m => tuesday.isSame(m.occurs))
      },
      wednesday: {
        occurs: wednesday,
        meals: meals.filter(m => wednesday.isSame(m.occurs))
      },
      thursday: {
        occurs: thursday,
        meals: meals.filter(m => thursday.isSame(m.occurs))
      },
      friday: {
        occurs: friday,
        meals: meals.filter(m => friday.isSame(m.occurs))
      },
      saturday: {
        occurs: saturday,
        meals: meals.filter(m => saturday.isSame(m.occurs))
      },
      sunday: {
        occurs: sunday,
        meals: meals.filter(m => sunday.isSame(m.occurs))
      },
    };
  }

  async onRecipeDrop(date: Moment.Moment, data: any) {
    await this.createMeal(date, data.dragData.recipeId);
    this.meals = await this.getMeals(this.selectedDate, Moment(this.selectedDate).add(5, 'weeks'));
    this.buildCalendar(this.selectedDate, this.meals);
  }

  async getMeals(start: Moment.Moment, stop: Moment.Moment) {
    const meals = await this.mealService.getAsync(start.toDate(), stop.toDate());
    return meals.map(m => {
      const recipe = this.allRecipes.find(r => r.id === m.recipeId);
      return {
        id: m.id,
        occurs: m.occurs,
        title: recipe.title
      };
    });
  }

  async onRemoveMeal(mealId: string) {
    await this.deleteMeal(mealId);
    this.meals = await this.getMeals(this.selectedDate, Moment(this.selectedDate).add(5, 'weeks'));
    this.buildCalendar(this.selectedDate, this.meals);
  }

  async createMeal(occurs: Moment.Moment, recipeId: string) {
    await this.mealService.createAsync({
      id: '',
      userId: '',
      recipeId,
      occurs: occurs.toDate()
    });
  }

  async deleteMeal(mealId: string) {
    await this.mealService.deleteAsync(mealId);
  }

  async createGroceryList(startDateString: string, stopDateString: string) {
    if (!startDateString || startDateString === '' || !stopDateString || stopDateString === '') {
      return;
    }

    const startDate = Moment(startDateString).toDate();
    const stopDate = Moment(stopDateString).toDate();
    await this.groceryService.createAsync(startDate, stopDate);
    this.router.navigate(['/groceries']);
  }
}

import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  allRecipes: Array<Recipe>;
  displayedRecipes: Array<Recipe>;

  constructor(private recipeService: RecipeService) { }

  async ngOnInit() {
    this.allRecipes = this.displayedRecipes = await this.recipeService.getAsync();
  }

  async search(keyword) {
    if (!keyword) {
      this.displayedRecipes = this.allRecipes;
      return;
    } else {
      this.displayedRecipes = this.allRecipes.filter(recipe => recipe.title.includes(keyword));
    }
  }
}

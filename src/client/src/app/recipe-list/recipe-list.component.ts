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
    this.allRecipes = this.displayedRecipes = await this.recipeService.getForUserAsync();
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
}

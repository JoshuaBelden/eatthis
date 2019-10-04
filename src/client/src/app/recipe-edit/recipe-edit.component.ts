import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IngredientParser } from '../services/ingredientParser.service';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  recipeForm;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ingredientParser: IngredientParser,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      title: '',
      description: '',
      imageUrl: '',
      ingredients: '',
      preparation: '',
    });

    this.route.paramMap.subscribe(async params => {
      const recipeId = params.get('recipeId');
      if (!recipeId) {
        return;
      }

      this.recipe = await this.recipeService.getAsync(recipeId);
      this.recipeForm = this.formBuilder.group({
        title: this.recipe.title,
        description: this.recipe.description,
        imageUrl: this.recipe.imageUrl,
        ingredients: this.ingredientParser.toString(this.recipe.ingredients),
        preparation: this.recipe.preparation,
      });
    });
  }

  async onSubmit(recipeData) {
    try {
      const recipe: Recipe = {
        id: this.recipe.id,
        userId: '',
        title: recipeData.title,
        description: recipeData.description,
        imageUrl: recipeData.imageUrl,
        preparation: recipeData.preparation,
        ingredients: this.ingredientParser.parse(recipeData.ingredients),
        yield: ''
      };
      await this.recipeService.createAsync(recipe);
    } catch (error) {

    }
  }
}

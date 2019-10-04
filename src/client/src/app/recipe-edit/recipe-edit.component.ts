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

  recipeId;
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
      ingredients: '',
      preparation: '',
    });

    this.route.paramMap.subscribe(async params => {
      this.recipeId = params.get('recipeId');
      if (!this.recipeId) {
        return;
      }

      const recipe = await this.recipeService.getAsync(this.recipeId);
      this.recipeForm = this.formBuilder.group({
        title: recipe.title,
        description: recipe.description,
        ingredients: this.ingredientParser.toString(recipe.ingredients),
        preparation: recipe.preparation,
      });
    });
  }

  async onSubmit(recipeData) {
    try {
      const recipe: Recipe = {
        id: this.recipeId,
        userId: '',
        title: recipeData.title,
        description: recipeData.description,
        preparation: recipeData.preparation,
        ingredients: this.ingredientParser.parse(recipeData.ingredients),
        yield: ''
      };
      await this.recipeService.createAsync(recipe);
    } catch (error) {

    }
    this.recipeForm.reset();
  }
}

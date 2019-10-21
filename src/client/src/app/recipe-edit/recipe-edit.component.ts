import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from 'ng-bootstrap-form-validation/lib/Models/error-message';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Result } from '../models/result';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: string;
  recipeForm;
  result: Result<Recipe>;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label} is required!`
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeForm = this.createFormGroup();

    this.route.paramMap.subscribe(async params => {
      this.recipeId = params.get('recipeId');
      if (!this.recipeId) {
        return;
      }

      const recipe = await this.recipeService.getAsync(this.recipeId);
      this.recipeForm = this.createFormGroup(recipe);
    });
  }

  async onSubmit(recipeData) {
    try {
      let recipe: Recipe = {
        id: recipeData.id,
        title: recipeData.title,
        description: recipeData.description,
        imageUrl: recipeData.imageUrl,
        preparation: recipeData.preparation,
        ingredients: this.ParseIngredientString(recipeData.ingredients),
        yield: ''
      };

      if (recipe.id) {
        recipe = await this.recipeService.updateAsync(recipe);
      } else {
        recipe = await this.recipeService.createAsync(recipe);
      }
      this.result = new Result<Recipe>(true, recipe);
    } catch (error) {
      this.result = new Result<Recipe>(false, null, error);
    }
  }

  async onDelete(id: string) {
    try {
      await this.recipeService.deleteAsync(id);
      this.router.navigate(['/recipes']);
    } catch (error) {
      this.result = new Result<Recipe>(false, null, error);
    }
  }

  createFormGroup(recipe?: Recipe) {
    return this.formBuilder.group({
      id: recipe ? recipe.id : '',
      title: new FormControl(recipe ? recipe.title : '', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      description: new FormControl(recipe ? recipe.description : '', [Validators.required]),
      imageUrl: recipe ? recipe.imageUrl : '',
      ingredients: new FormControl(this.ConvertIngredientsToText(recipe ? recipe.ingredients : []), [Validators.required]),
      preparation: new FormControl(recipe ? recipe.preparation : '', [Validators.required]),
    });
  }

  private ConvertIngredientsToText(ingredients: Array<Ingredient>): string {
    return ingredients
      .map(ingredient => [
        ingredient.line || ''
      ]
        .filter(item => item)
        .join(' '))
      .join('\r\n');
  }

  private ParseIngredientString(ingredients: string): Array<Ingredient> {
    return ingredients
      .split('\n')
      .map(line => line.replace('\r', ''))
      .map(line => this.parseLine(line));
  }

  private parseLine(line: string): Ingredient {
    return {
      line,
      quantity: 0,
      unit: '',
      ingredient: ''
    };
  }
}

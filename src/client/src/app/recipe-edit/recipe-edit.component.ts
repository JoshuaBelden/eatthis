import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorMessage } from 'ng-bootstrap-form-validation/lib/Models/error-message';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { IngredientParser } from '../services/ingredientParser.service';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Result } from '../models/result';

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
    private ingredientParser: IngredientParser,
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
        ingredients: this.ingredientParser.parse(recipeData.ingredients),
        yield: ''
      };

      if (recipe.id) {
        recipe = await this.recipeService.updateAsync(recipe);
      } else {
        recipe = await this.recipeService.createAsync(recipe);
      }

      // this.recipeForm = this.createFormGroup(recipe);

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
      ingredients: new FormControl(this.ingredientParser.toString(recipe ? recipe.ingredients : []), [Validators.required]),
      preparation: new FormControl(recipe ? recipe.preparation : '', [Validators.required]),
    });
  }
}

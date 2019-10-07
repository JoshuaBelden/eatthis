import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IngredientParser } from '../services/ingredientParser.service';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { concat } from 'rxjs/operators';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ingredientParser: IngredientParser,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeForm = this.formBuilder.group({
      id: '',
      title: '',
      description: '',
      imageUrl: '',
      ingredients: '',
      preparation: '',
    });

    this.route.paramMap.subscribe(async params => {
      this.recipeId = params.get('recipeId');
      if (!this.recipeId) {
        return;
      }

      const recipe = await this.recipeService.getAsync(this.recipeId)
      this.recipeForm = this.formBuilder.group({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        ingredients: this.ingredientParser.toString(recipe.ingredients),
        preparation: recipe.preparation,
      });
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

      this.recipeForm = this.formBuilder.group({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        ingredients: this.ingredientParser.toString(recipe.ingredients),
        preparation: recipe.preparation,
      });

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
}

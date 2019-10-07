import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { NotificationService } from './notification.service';
import { AuthenticatedUser } from '../models/authenticatedUser';
import { Recipe } from '../models/recipe';

@Injectable()
export class RecipeService {
  constructor(
    private http: HttpClient
  ) { }

  async getAsync(recipeId: string): Promise<Recipe> {
    const result = await this.http.get<Recipe>(`${environment.apiEndpoint}/recipe/${recipeId}`).toPromise();
    return result;
  }

  async getForUserAsync(): Promise<Array<Recipe>> {
    const result = await this.http.get<Array<Recipe>>(`${environment.apiEndpoint}/recipes/user`).toPromise();
    return result;
  }

  async createAsync(recipe: Recipe): Promise<Recipe> {
    const result = await this.http.post<Recipe>(`${environment.apiEndpoint}/recipe`, recipe).toPromise();
    return result;
  }

  async updateAsync(recipe: Recipe): Promise<Recipe> {
    const result = await this.http.put<Recipe>(`${environment.apiEndpoint}/recipe`, recipe).toPromise();
    return result;
  }

  async deleteAsync(id: string): Promise<void> {
    await this.http.delete(`${environment.apiEndpoint}/recipe/${id}`).toPromise();
  }
}

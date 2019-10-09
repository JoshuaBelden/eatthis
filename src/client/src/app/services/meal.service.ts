import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Meal } from '../models/meal';
import { Moment } from 'moment';

@Injectable()
export class MealService {
  constructor(
    private http: HttpClient
  ) { }

  async getAsync(startDate: Moment, stopDate: Moment): Promise<Array<Meal>> {
    const url = `${environment.apiEndpoint}/meals/${startDate.format('YYYY-MM-DD')}/${stopDate.format('YYYY-MM-DD')}`;
    const result = await this.http.get<Array<Meal>>(url).toPromise();
    return result;
  }

  async createAsync(meal: Meal): Promise<Meal> {
    const result = await this.http.post<Meal>(`${environment.apiEndpoint}/meal`, meal).toPromise();
    return result;
  }

  async updateAsync(meal: Meal): Promise<Meal> {
    const result = await this.http.put<Meal>(`${environment.apiEndpoint}/meal`, meal).toPromise();
    return result;
  }

  async deleteAsync(id: string): Promise<void> {
    await this.http.delete(`${environment.apiEndpoint}/meal/${id}`).toPromise();
  }
}

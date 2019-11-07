import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Meal } from '../models/meal';
import * as Moment from 'moment';

@Injectable()
export class MealService {
  constructor(
    private http: HttpClient
  ) { }

  async getAsync(startDate: Date, stopDate: Date): Promise<Array<Meal>> {
    const formattedStartDate = Moment(startDate).format('YYYY-MM-DD');
    const formattedStopDate = Moment(stopDate).format('YYYY-MM-DD');
    const url = `${environment.apiEndpoint}/meals/${formattedStartDate}/${formattedStopDate}`;
    const result = await this.http.get<Array<Meal>>(url).toPromise();
    return result;
  }

  async createAsync(meal: Meal): Promise<Meal> {
    const result = await this.http.post<Meal>(`${environment.apiEndpoint}/meal`, meal).toPromise();
    return result;
  }

  async deleteAsync(id: string): Promise<void> {
    await this.http.delete(`${environment.apiEndpoint}/meal/${id}`).toPromise();
  }
}

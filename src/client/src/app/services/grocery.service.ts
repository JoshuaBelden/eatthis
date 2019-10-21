import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as Moment from 'moment';

import { Grocery } from '../models/grocery';
import { GroceryItem } from '../models/groceryItem';

@Injectable()
export class GroceryService {
  constructor(
    private http: HttpClient
  ) { }

  async getAsync(groceryId: string): Promise<Grocery> {
    const result = await this.http.get<Grocery>(`${environment.apiEndpoint}/grocery/${groceryId}`).toPromise();
    return result;
  }

  async getForUserAsync(): Promise<Array<Grocery>> {
    const result = await this.http.get<Array<Grocery>>(`${environment.apiEndpoint}/groceries/user`).toPromise();
    return result;
  }

  async createAsync(startDate: Date, stopDate: Date): Promise<Grocery> {
    const formattedStartDate = Moment(startDate).format('YYYY-MM-DD');
    const formattedStopDate = Moment(stopDate).format('YYYY-MM-DD');
    const result = await this.http.post<Grocery>(`${environment.apiEndpoint}/grocery`, {
      startDate: formattedStartDate,
      stopDate: formattedStopDate
    }).toPromise();
    return result;
  }

  async deleteAsync(id: string): Promise<void> {
    await this.http.delete(`${environment.apiEndpoint}/grocery/${id}`).toPromise();
  }

  async createGroceryItemAsync(groceryId: string, line: string): Promise<GroceryItem> {
    const result = await this.http.post<GroceryItem>(`${environment.apiEndpoint}/grocery/${groceryId}`, {
      line
    }).toPromise();

    return result;
  }

  async updateGroceryItemAsync(groceryId: string, groceryItem: GroceryItem): Promise<GroceryItem> {
    const result = await this.http.put<GroceryItem>(`${environment.apiEndpoint}/grocery/${groceryId}`, groceryItem).toPromise();
    return result;
  }

  async deleteGroceryItemAsync(groceryId: string, groceryItemId: string) {
    await this.http.delete(`${environment.apiEndpoint}/grocery/${groceryId}/${groceryItemId}`).toPromise();
  }
}

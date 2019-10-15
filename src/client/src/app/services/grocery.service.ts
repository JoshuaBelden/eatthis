import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as Moment from 'moment';

import { Grocery } from '../models/grocery';

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

  async createAsync(grocery: Grocery): Promise<Grocery> {
    const result = await this.http.post<Grocery>(`${environment.apiEndpoint}/grocery`, grocery).toPromise();
    return result;
  }

  async updateAsync(grocery: Grocery): Promise<Grocery> {
    const result = await this.http.put<Grocery>(`${environment.apiEndpoint}/grocery`, grocery).toPromise();
    return result;
  }

  async deleteAsync(id: string): Promise<void> {
    await this.http.delete(`${environment.apiEndpoint}/grocery/${id}`).toPromise();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { CommonItems } from '../models/commonItems';

@Injectable()
export class CommonItemsService {
  constructor(
    private http: HttpClient
  ) { }

  async getForUserAsync(): Promise<CommonItems> {
    const result = await this.http.get<CommonItems>(`${environment.apiEndpoint}/commonitems`).toPromise();
    return result;
  }

  async updateAsync(commonItems: CommonItems): Promise<CommonItems> {
    const result = await this.http.post<CommonItems>(`${environment.apiEndpoint}/commonitems`, commonItems).toPromise();
    return result;
  }
}

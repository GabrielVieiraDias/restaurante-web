import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DishResponse } from '../models/dish-response.model';
import { DishRequest } from '../models/dish-request.model';

@Injectable({
  providedIn: 'root'
})
export class DishService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }
  getAll(): Observable<DishResponse> {

    return this.http.get<DishResponse>(this.getUrlApi() + this.getEndpointDish(),
      {
        headers: this.getHeadersWithUserAuthorization()
      });
  }

  getById(id: number) {
    return this.http.get<DishResponse>(this.getUrlApi() + this.getEndpointDish() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  save(dish: DishRequest) {
    return this.http.post<DishRequest>(this.getUrlApi() + this.getEndpointDish(), dish,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  update(dish: DishRequest) {
    return this.http.put<DishRequest>(this.getUrlApi() + this.getEndpointDish(), dish,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  delete(id: number) {
    return this.http.delete(this.getUrlApi() + this.getEndpointDish() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }
}

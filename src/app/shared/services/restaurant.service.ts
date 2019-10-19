import { RestaurantRequest } from 'src/app/shared/models/restaurante-request.model';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantResponse } from '../models/restaurante-response.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends GenericService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<RestaurantResponse> {

    return this.http.get<RestaurantResponse>(this.getUrlApi() + this.getEndpointRestaurant(),
      {
        headers: this.getHeadersWithUserAuthorization()
      });
  }

  getById(id: number) {
    return this.http.get<RestaurantResponse>(this.getUrlApi() + this.getEndpointRestaurant() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  save(restaurant: RestaurantRequest) {
    return this.http.post<RestaurantRequest>(this.getUrlApi() + this.getEndpointRestaurant(), restaurant,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  update(restaurant: RestaurantRequest) {
    return this.http.put<RestaurantRequest>(this.getUrlApi() + this.getEndpointRestaurant(), restaurant,
      { headers: this.getHeadersWithUserAuthorization() });
  }

  delete(id: number) {
    return this.http.delete(this.getUrlApi() + this.getEndpointRestaurant() + '/' + id,
      { headers: this.getHeadersWithUserAuthorization() });
  }
}

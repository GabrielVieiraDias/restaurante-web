import { RestaurantResponse } from './restaurante-response.model';

export class DishResponse {
    id: number;
    description: string;
    price: number;
    restaurant_id: number;
    restaurant: RestaurantResponse;
}

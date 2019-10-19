import { Routes } from '@angular/router';
import { DishComponent } from './dish/dish.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { DishListComponent } from './dish/dish-list/dish-list.component';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant/restaurant-detail/restaurant-detail.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReserveListComponent } from './reserve/reserve-list/reserve-list.component';
import { ReserveDetailComponent } from './reserve/reserve-detail/reserve-detail.component';

export const appRoutes: Routes = [
    {
        path: '', component: MenuComponent, canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            {
                path: 'dish', component: DishComponent,
                children: [
                    { path: '', component: DishListComponent },
                    { path: 'new', component: DishDetailComponent },
                    { path: 'edit/:id', component: DishDetailComponent }
                ]
            },
            {
                path: 'restaurant', component: RestaurantComponent,
                children: [
                    { path: '', component: RestaurantListComponent },
                    { path: 'new', component: RestaurantDetailComponent },
                    { path: 'edit/:id', component: RestaurantDetailComponent }
                ]
            },
            {
                path: 'reserve', component: ReserveComponent,
                children: [
                    { path: '', component: ReserveListComponent },
                    { path: 'new', component: ReserveDetailComponent },
                    { path: 'edit/:id', component: ReserveDetailComponent }
                ]
            },
            { path: 'pageNotFound', component: PageNotFoundComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];

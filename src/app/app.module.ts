import { DishService } from './shared/services/dish.service';
import { LoaderService } from './shared/services/loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatSearchableModule } from '@bl4y/mat-searchable';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatPaginatorIntl,
  DateAdapter,
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { DataViewModule } from 'primeng/dataview';
import { DropdownModule, DialogModule, PanelModule, MessageService } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AuthenticationService } from './shared/services/authentication.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { ModalDialogComponent } from './shared/layout/modal/modal-dialog/modal-dialog.component';
import { ModalConfirmDialogComponent } from './shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { PortalModule } from '@angular/cdk/portal';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { PaginatorI18n } from './shared/util/paginatorI18n';
import { LoaderInterceptor } from './auth/loader.interceptor';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { NumbersOnlyDirective } from './shared/directives/numbers-only.directive';
import { DecimalNumbersOnlyDirective } from './shared/directives/decimal-numbers-only.directive';
import { DateFormat } from './shared/util/date-format';
import { FileUploadComponent } from './shared/layout/file-upload/file-upload.component';
import { FileService } from './shared/services/file.service';
// tslint:disable-next-line:max-line-length
import { DateDirective } from './shared/directives/date.directive';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant/restaurant-detail/restaurant-detail.component';
import { DishComponent } from './dish/dish.component';
import { DishListComponent } from './dish/dish-list/dish-list.component';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { RestaurantService } from './shared/services/restaurant.service';
import { ReserveComponent } from './reserve/reserve.component';
import { ReserveListComponent } from './reserve/reserve-list/reserve-list.component';
import { ReserveDetailComponent } from './reserve/reserve-detail/reserve-detail.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localePt);

const modulesMaterialDesign = [
  MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RestaurantComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    DishComponent,
    DishListComponent,
    DishDetailComponent,
    ModalDialogComponent,
    ModalConfirmDialogComponent,
    MenuComponent,
    PageNotFoundComponent,
    NumbersOnlyDirective,
    DecimalNumbersOnlyDirective,
    FileUploadComponent,
    DateDirective,
    ReserveComponent,
    ReserveListComponent,
    ReserveDetailComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),

    modulesMaterialDesign,

    HttpClientModule,

    DataViewModule,
    DropdownModule,
    DialogModule,
    PanelModule,
    FieldsetModule,
    ToastModule,

    PortalModule,
    FlexLayoutModule,

    AngularFontAwesomeModule,

    NgxMatSelectSearchModule,
    MatSearchableModule,
  ],
  exports: [
    modulesMaterialDesign,
    RouterModule,
    TranslateModule
  ],
  providers: [
    AuthGuard,
    LoaderService,
    AuthenticationService,
    RestaurantService,
    DishService,
    FileService,
    TranslateService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: DateAdapter, useClass: DateFormat
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  entryComponents: [
    ModalDialogComponent,
    ModalConfirmDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in');
  }
}

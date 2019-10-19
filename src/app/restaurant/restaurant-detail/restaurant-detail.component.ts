import { RestaurantRequest } from './../../shared/models/restaurante-request.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { RestaurantResponse } from 'src/app/shared/models/restaurante-response.model';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurantForm: FormGroup;
  restaurant: RestaurantRequest;
  restaurantId: number;
  title: string;
  message: string;
  buttonDisableForm: boolean;

  constructor(private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router) {
    this.restaurantForm = this.restaurantFormGroup();
  }

  ngOnInit() {
    this.init();
  }

  restaurantFormGroup() {
    return this.formBuilder.group({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
    });
  }

  restaurantFormGroupEdit() {
    this.restaurantForm.patchValue({
      id: this.restaurant.id,
      name: this.restaurant.name
    });
  }

  get f() { return this.restaurantForm.controls; }

  submit() {
    this.buttonDisableForm = true;

    if (this.restaurantForm.value.id && this.restaurantForm.value.id !== 0) {
      this.updateRestaurant();
    } else {
      this.saveRestaurant();
    }
  }

  saveRestaurant() {
    this.restaurantService.save(this.restaurantForm.value).subscribe((data: RestaurantResponse) => {
      this.restaurant = data;

      const title = this.translate.instant('restaurant.title.new');
      const message = this.translate.instant('restaurant.message.save_success');

      this.openDialog(title, message);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('restaurant.title.error');
        const message = this.translate.instant('restaurant.message.error_save');

        this.openDialog(title, message, error);
      });
  }

  updateRestaurant() {
    this.restaurantService.update(this.restaurantForm.value).subscribe((data: RestaurantResponse) => {
      this.restaurant = data;
      const title = this.translate.instant('restaurant.title.edit');
      const message = this.translate.instant('restaurant.message.edit_success');

      this.openDialog(title, message);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('restaurant.title.error');
        const message = this.translate.instant('restaurant.message.error_edit');

        this.openDialog(title, message, error);
      });
  }

  getById() {
    this.restaurantService.getById(this.restaurantId).subscribe((result: RestaurantRequest) => {
      if (result) {
        this.restaurant = result;
        this.restaurantFormGroupEdit();
      } else {
        const route = this.translate.instant('routes.restaurant.list');
        this.router.navigate([route]);
      }
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('restaurant.title.error');
        const message = this.translate.instant('restaurant.message.error_get');

        this.openDialog(title, message, error);
      });
  }

  openDialog(title: string, message: string, error?: HttpErrorResponse): void {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message }
    });

    if (error) {
      console.log(error.message);
    } else {
      dialogRef.afterClosed().subscribe(() => {
        const route = this.translate.instant('routes.restaurant.list');
        this.router.navigate([route]);
    });
    }
  }

  init() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      if (this.restaurantId) {
        this.getById();
        this.translate.get(['restaurant']).subscribe((response: any) => {
          this.title = response.restaurant.title.edit;
        });
      } else {
        this.translate.get(['restaurant']).subscribe((response: any) => {
          this.title = response.restaurant.title.new;
        });
      }
    });
  }
}

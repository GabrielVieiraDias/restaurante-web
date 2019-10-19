import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DishRequest } from 'src/app/shared/models/dish-request.model';
import { DishService } from 'src/app/shared/services/dish.service';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishResponse } from 'src/app/shared/models/dish-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { RestaurantResponse } from 'src/app/shared/models/restaurante-response.model';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {

  dishForm: FormGroup;
  dish: DishRequest;
  restaurants: RestaurantResponse[];
  dishId: number;
  title: string;
  message: string;
  buttonDisableForm: boolean;

  constructor(private formBuilder: FormBuilder,
    private dishService: DishService,
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router) {
    this.dishForm = this.dishFormGroup();
  }

  ngOnInit() {
    this.init();
  }

  dishFormGroup() {
    return this.formBuilder.group({
      id: new FormControl(0),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      price: new FormControl('', [Validators.required]),
      restaurant_id: new FormControl('', [Validators.required]),
    });
  }

  dishFormGroupEdit() {
    this.dishForm.patchValue({
      id: this.dish.id,
      description: this.dish.description,
      price: this.dish.price,
      restaurant_id: this.dish.restaurant_id
    });
  }

  get f() { return this.dishForm.controls; }

  submit() {
    this.buttonDisableForm = true;

    if (this.dishForm.value.id && this.dishForm.value.id !== 0) {
      this.updateDish();
    } else {
      this.saveDish();
    }
  }

  saveDish() {
    this.dishService.save(this.dishForm.value).subscribe((data: DishResponse) => {
      this.dish = data;

      const title = this.translate.instant('dish.title.new');
      const message = this.translate.instant('dish.message.save_success');

      this.openDialog(title, message);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('dish.title.error');
        const message = this.translate.instant('dish.message.error_save');

        this.openDialog(title, message, error);
      });
  }

  updateDish() {
    this.dishService.update(this.dishForm.value).subscribe((data: DishResponse) => {
      this.dish = data;
      const title = this.translate.instant('dish.title.edit');
      const message = this.translate.instant('dish.message.edit_success');

      this.openDialog(title, message);
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('dish.title.error');
        const message = this.translate.instant('dish.message.error_edit');

        this.openDialog(title, message, error);
      });
  }

  getById() {
    this.dishService.getById(this.dishId).subscribe((result: DishRequest) => {
      if (result) {
        this.dish = result;
        this.dishFormGroupEdit();
      } else {
        const route = this.translate.instant('routes.dish.list');
        this.router.navigate([route]);
      }
    },
      (error: HttpErrorResponse) => {
        const title = this.translate.instant('dish.title.error');
        const message = this.translate.instant('dish.message.error_get');

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
        const route = this.translate.instant('routes.dish.list');
        this.router.navigate([route]);
    });
    }
  }

  getAllRestaurants() {
    this.restaurantService.getAll().subscribe((result: any) => {
      this.restaurants = result;
    });
  }

  init() {
    this.route.params.subscribe(params => {
      this.dishId = params['id'];
      if (this.dishId) {
        this.getById();
        this.translate.get(['dish']).subscribe((response: any) => {
          this.title = response.dish.title.edit;
        });
      } else {
        this.translate.get(['dish']).subscribe((response: any) => {
          this.title = response.dish.title.new;
        });
      }
    });

    this.getAllRestaurants();
  }
}

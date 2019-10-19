import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantResponse } from 'src/app/shared/models/restaurante-response.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalConfirmDialogComponent } from 'src/app/shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  Restaurants: RestaurantResponse[];
  title: string;
  displayedColumns: string[] = ['name', 'id'];
  dataSource: MatTableDataSource<RestaurantResponse>;
  message: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAll();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAll() {
      this.restaurantService.getAll().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<RestaurantResponse>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        (err: HttpErrorResponse) => {
          console.log(err.error);
        });
  }

  openConfirmDialog(restaurant: RestaurantResponse): void {
    const messageConfirm = this.translate.instant('restaurant.message.confirm_delete');

    const dialogRef = this.dialog.open(ModalConfirmDialogComponent, {
      position: { top: '6%' },
      data: { title: messageConfirm }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(restaurant.id);
      }
    });
  }

  delete(id: number) {
    this.restaurantService.delete(id).subscribe((response) => {
      const title = this.translate.instant('restaurant.title.success');
      const message = this.translate.instant('restaurant.message.delete_success');
      this.openDialog(title, message);
      this.getAll();
    },
      (err: HttpErrorResponse) => {
        const title = this.translate.instant('restaurant.title.error');
        const message = this.translate.instant('restaurant.message.error_delete');
        this.openDialog(title, message, err);
      });
  }

  openDialog(title: string, message: string, error?: HttpErrorResponse): void {
    this.dialog.open(ModalDialogComponent, {
      position: { top: '6%' },
      data: { title: title, message: message }
    });

    if (error) {
      console.log(error.message);
    }
  }

}

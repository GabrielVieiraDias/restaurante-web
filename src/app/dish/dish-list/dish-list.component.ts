import { Component, OnInit, ViewChild } from '@angular/core';
import { DishResponse } from 'src/app/shared/models/dish-response.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DishService } from 'src/app/shared/services/dish.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalConfirmDialogComponent } from 'src/app/shared/layout/modal/modal-confirm-dialog/modal-confirm-dialog.component';
import { ModalDialogComponent } from 'src/app/shared/layout/modal/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  dishs: DishResponse[];
  title: string;
  displayedColumns: string[] = ['description', 'price', 'name', 'id'];
  dataSource: MatTableDataSource<DishResponse>;
  message: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dishService: DishService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute) {
     }

  ngOnInit() {
    this.getAll();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getAll() {
      this.dishService.getAll().subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<DishResponse>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data1, filter) => {
          filter = filter.trim().toLowerCase();
          const dataStr = data1.description.trim().toLowerCase() + data1.price
            + data1.restaurant.name.trim().toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        };
      },
        (err: HttpErrorResponse) => {
          console.log(err.error);
        });
  }

  openConfirmDialog(restaurant: DishResponse): void {
    const messageConfirm = this.translate.instant('dish.message.confirm_delete');

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
    this.dishService.delete(id).subscribe((response) => {
      const title = this.translate.instant('dish.title.success');
      const message = this.translate.instant('dish.message.delete_success');
      this.openDialog(title, message);
      this.getAll();
    },
      (err: HttpErrorResponse) => {
        const title = this.translate.instant('dish.title.error');
        const message = this.translate.instant('dish.message.error_delete');
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

import { Component, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

  loading: any;

  constructor(private _translate: TranslateService,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef) {
    this._translate.setDefaultLang('pt-br');
    this._translate.use('pt-br');
  }

  ngAfterViewChecked(): void {
    this.loading = this.loaderService.isLoading;
    this.cdr.detectChanges();
  }

}

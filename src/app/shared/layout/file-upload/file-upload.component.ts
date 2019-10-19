import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  avatarUrl = './assets/images/logo.png';
  imageError = './assets/images/error-image-generic.png';
  sizeAvatar = 4194304; // 4mb
  avatarBase64: '';
  private _url: string;

  @Input() form: FormGroup;

  @Input() avaliador: boolean;

  get url(): string {
    return this._url;
  }

  @Input()
  set url(url: string) {
    if (url) {
      this._url = url;
    }
  }

  @Input() showInputUpload: boolean;

  constructor(public dialog: MatDialog) { }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        if (this.checkExtensionChange(file.name) && !this.checkSizeChange(file.size)) {
          this._url = e.target.result;
          const data = this._url.replace('data:application/pdf;base64,', '');
          this.form.controls['documento_base64'].setValue(data ? data : '');
        } else {
          this._url = this.imageError;
        }
      };
      this.form.controls['documento'].setValidators([this.checkSize(file.size), this.checkExtension]);
      this.form.controls['documento'].updateValueAndValidity();

    } else {
      this.getBase64ImageFromURL(this.avatarUrl).subscribe(base64data => {
        this._url = base64data;
        this.form.controls['documento_base64'].setValue(base64data);
      });
    }
    this.form.value.avatar = '';
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace('data:application/pdf;base64,', '');
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  checkSize(size): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value) {
        return size > this.sizeAvatar ? { 'filesizeMax': true } : null;
      }
    };
  }

  checkExtension(c: AbstractControl) {
    if (c.value) {
      const valToLower = c.value.toLowerCase();
      const regex = new RegExp('(.*?)\.(pdf)$');
      const regexTest = regex.test(valToLower);
      return !regexTest ? { 'notSupportedFileType': true } : null;
    }
  }

  checkSizeChange(size) {
    return size > this.sizeAvatar ? true : false;
  }

  checkExtensionChange(c: string) {
    const valToLower = c.toLowerCase();
    const regex = new RegExp('(.*?)\.(pdf)$');
    const regexTest = regex.test(valToLower);
    return regexTest ? true : false;
  }

  changeInputUpload() {
    return this.showInputUpload = !this.showInputUpload;
  }
}

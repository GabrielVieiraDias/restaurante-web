import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  constructor() { }

  onTouched: any;
  onChange: any;
  value: '';
  dateType = '99/99/9999';

  @Input() dateMask: string;

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {

    const value = $event.target.value.replace(/\D/g, '');

    if ($event.keyCode === 8) {
      return value;
    }

    if (value.length <= 8) {
      $event.target.value = this.maskDate(value);
    } else {
      $event.target.value = this.maskDate(value);
      return $event.target.value.substr(0, 10);
    }

  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {

    if ($event.target.value.length === this.dateType.length) {
      return $event.target.value;
    } else {
      return $event.target.value.substr(0, 10);
    }

  }

  maskDate(value: string): string {

    value = value.replace(/\D/g, '');

    const replacement = this.dateType.replace(/\D/g, '').replace(/9/g, '_');
    const valueMask = value + replacement.substring(0, replacement.length - value.length);
    let valueMaskPos = 0;
    value = '';
    for (let i = 0; i < this.dateType.length; i++) {
      if (isNaN(parseInt(this.dateType.charAt(i), 10))) {
        value += this.dateType.charAt(i);
      } else {
        value += valueMask[valueMaskPos++];
      }
    }

    if (value.indexOf('_') > -1) {
      value = value.substr(0, value.indexOf('_'));
    }
    return value;
  }
}

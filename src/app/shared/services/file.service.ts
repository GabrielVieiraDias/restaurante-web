import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  downloadFile(result: any, name: string, type: string) {
    const byteCharacters = atob(result);

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const uri = window.URL.createObjectURL(new Blob([byteArray], {type: type}));

        const link = document.createElement('a');
        link.href = uri;
        link.download = name;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(uri);
  }

  donwloadFilevalidated(fileName: string, src: string) {
    const uri = src;
    const link = document.createElement('a');
    link.href = uri;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(uri);
  }
}

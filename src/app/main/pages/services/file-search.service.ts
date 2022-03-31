import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileSearchService {
  selectedFiles: File[] = [];
  constructor(private http: HttpClient) { }
  
  // search for document based on keyword
  search(keyword: string) {
    const model = {
      keyword: keyword
    };
    return this.http.post(environment.apiUrl + "Storage/search", model);
  }

  // upload a  file
  uploadFile(model: any){
    return this.http.post(environment.apiUrl + "Storage/upload", model);
  }

  // download file
  donwloadFile(id: string){
    return this.http.get(environment.apiUrl + "Storage/DownLoadFile/" + id, {
      responseType: 'blob' as 'json'
    });
  }

  GetFile(pdfBlob: any, fileNameDotExt: string): void {
    // if (window.navigator.userAgent.indexOf('Trident/7.0') > -1) {
    //   window.navigator.msSaveOrOpenBlob(pdfBlob, fileNameDotExt);
    // } else {
      const url = window.URL.createObjectURL(pdfBlob);
      window.open(url);
    // }
  }

  // add file to list of selected files
  addFileToList(file: File) {
    this.selectedFiles.push(file);
  }

  // return all selected files
  getFiles() {
    return this.selectedFiles.map(x => x);
  }

  // remove file from selected list
  removeFile(file: File) {
    this.selectedFiles.splice(this.selectedFiles.findIndex(item => item == file), 1);
  }
}

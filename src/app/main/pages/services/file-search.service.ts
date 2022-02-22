import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileSearchService {
  selectedFiles: File[] = [];
  constructor(private http: HttpClient) { }

  search(keyword: string) {
    const model = {
      keyword: keyword
    };
    return this.http.post(environment.apiUrl + "Storage/search", model);
  }

  uploadFile(model: any){
    return this.http.post(environment.apiUrl + "Storage/upload", model);
  }

  addFileToList(file: File) {
    this.selectedFiles.push(file);
  }

  getFiles() {
    return this.selectedFiles.map(x => x);
  }
}

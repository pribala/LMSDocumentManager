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

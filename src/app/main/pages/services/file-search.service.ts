import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileSearchService {

  constructor(private http: HttpClient) { }

  search(keyword: string) {
    const model = {
      keyword: keyword
    };
    return this.http.post(environment.apiUrl + "Storage/search", model);
  }
}
